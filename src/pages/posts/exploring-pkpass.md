---
layout: ../../layouts/PostLayout.astro
title: "Exploring file formats #0: pkpass"
pubDate: 28 June 2023
description: "How I used my coding skills to get back my flying ticket."
author: "Stefan Asandei"
tags: []
---

Recently I recieved a flying ticket, as a gift, from a relative. However, the ticket itself was within a file with the `pkpass` format. This is a file format made for the Apple Wallet to replace physical passes. Since I don't have an iPhone, I couldn't open my flying ticket and I had to use my _hackerman skills_ to open the pass. I will walk throughtout my thinking process and exploration as I develop my own free and open source viewer. For the purposes of this article I will use a modified version of the original ticket, with the filename `ticket.pkpass`. I'm on a GNU/Linux system by the way, so I'm using the terminal to explore this file format.

## Exploration

Let's start by getting a hexdump of this thing:

```bash
$ hexdump ./ticket.pkpass | less

0000000 4b50 0403 0014 0000 0000 7c2c 56d1 0000
0000010 0000 0000 0000 0000 0000 0009 0020 6564
0000020 6c2e 7270 6a6f 552f 0d54 0700 b624 648d
0000030 b624 648d b624 648d 7875 000b 0401 01f5
0000040 0000 f504 0001 5000 034b 1404 0000 0000
0000050 2c00 d17c 0056 0000 0000 0000 0000 0000
:

```

This is already great! We can see the first two bytes are `4b50 0403`, which is the file signature. This stands for `Pk..`, which is specific for the zip file format. PK stands for the initials of the creater of zip, Phil Katz. A lot of "custom" file formats are actually just zip archives, a couple of examples are apk, docx, ods, usdz and many more.

Now that we know that pkpass is just a wrapper for zip, let's see what's inside the archive:

```bash
$ unzip -qq ticket.pkpass -d ./ticket

$ tree ./ticket

./ticket
├── en.lproj
│   └── pass.strings
├── logo.png
├── logo@2x.png
├── manifest.json
├── pass.json
└── signature

# truncated other language dirs
9 directories, 16 files

```

Seems that nothing is ofuscated! It looks like we have directories with translations for multiple languages, an image file for the company logo and a `pass.json` file with all the metadata we need. We can ignore the `manifest.json` and `signature` files. Let's take a quick look at the `pass.json` file:

```bash
$ cat pass.json | less

{
  "passTypeIdentifier": "pass.com.ryanair",
  "formatVersion": 1,
  "serialNumber": "39eb707276c48c87ty721h127abcf991ac",
  "description": "boarding_pass",
  "organizationName": "Ryanair",
:

# using less to get limited output
```

Using this json data we can generate our own ticket image with the necesarry data!

## Displaying the data

I'm using python to write a quick script for this. I will also use a couple of libraries:

- PIL: image generation, to write the ticket data to a `jpeg`
- pkpass: a nice library which abstracts zip extraction and wraps the json data in an object
- aztec_code_generator: my ticket had an aztec code instead of a QR code, I don't know if that's required by the airline, but I went with this outdated format anyway to be sure I won't get rejected on boarding

```py
from PIL import Image, ImageDraw, ImageFont
from pkpass import Pkpass, Airline
from aztec_code_generator import AztecCode
```

Let's write a class first to only get the data we need:

```py
class FlightTicket:
    def __init__(self, flight):
        self.flight = flight

        self.serial = flight.data["serialNumber"]
        self.company = flight.data["organizationName"]
        self.date = flight.data["relevantDate"]
        self.location = flight.data["locations"][0]

        self.foreground = flight.data["foregroundColor"]
        self.background = flight.data["backgroundColor"]
        self.label = flight.data["labelColor"]

        self.expiration = flight.data["expirationDate"]
        self.depart = flight.data["boardingPass"]["headerFields"][0]["value"]
        self.gates = flight.data["boardingPass"]["secondaryFields"][0]["value"]

        self.barcode = flight.data["barcodes"][0]["message"]
        self.alt = flight.data["barcodes"][0]["altText"]

        self.origin = flight.data["boardingPass"]["primaryFields"][0]["value"]
        self.destination = flight.data["boardingPass"]["primaryFields"][1]["value"]

        self.seat = flight.data["boardingPass"]["secondaryFields"][2]["value"]
        self.id = flight.data["boardingPass"]["auxiliaryFields"][1]["value"]

        self.passenger = flight.data["boardingPass"]["auxiliaryFields"][0]["value"]
```

Now add a method that writes this data to an image:

```py
  def to_image(self, filename):
        font_h1 = ImageFont.truetype("arial.ttf", 60)
        font_h2 = ImageFont.truetype("arial.ttf", 45)

        image_width = 800
        image_height = 1200

        image = Image.new("RGB", (image_width, image_height), self.background)
        draw = ImageDraw.Draw(image)

        draw.text((50, 50), self.company, fill=self.label, font=font_h1)
        draw.text((450, 50), self.date[:10], fill=self.foreground, font=font_h1)
        draw.text((50, 130), self.passenger, fill=self.foreground, font=font_h2)

        aztec_code = AztecCode(self.barcode)
        aztec_img = aztec_code.image()
        size = 450
        az = aztec_img.resize((size, size), resample=Image.NEAREST)
        image.paste(az, (170, 250))

        draw.text((300, 710), self.alt, fill=self.foreground, font=font_h2)

        draw.text((50, 850), f"Gates Close: {self.gates[11:-1]}", fill=self.foreground, font=font_h2)
        draw.text((50, 920), f"Fly out: {self.depart[11:-1]}", fill=self.foreground, font=font_h2)
        draw.text((50, 990), f"{self.origin} → {self.destination}", fill=self.foreground, font=font_h2)
        draw.text((50, 1060), self.id, fill=self.foreground, font=font_h2)
        draw.text((50, 1130), f"Seat {self.seat}", fill=self.foreground, font=font_h2)

        image.save(filename, "JPEG")
```

I know this isn't very clean code, but I didn't bother using an UI framework or at least a layout engine since this isn't a complex image. Now wrap all of this togheter and get my ticket back:

```py
kpass = Pkpass("ticket.pkpass")
flight = Airline(kpass.read())

ticket = FlightTicket(flight)
ticket.to_image("ticket.jpg")
```

<div style="display: flex; flex-direction: column; gap: 1rem;">
This generates this `ticket.jpg` file:

<img src="https://cdn.discordapp.com/attachments/833285965019217980/1123524368392261683/ticket.jpg" alt="ticket" width="200"/>
</div>

I think this was quit a useful script! I could add a Flask server and deploy this app so anyone can view their `pkpass` tickets, but I don't think there's a need for this. Just a neet little project :)

## Resources

- https://en.wikipedia.org/wiki/PKPASS
- https://en.wikipedia.org/wiki/List_of_file_signatures
- https://pillow.readthedocs.io/en/stable/handbook/tutorial.html
