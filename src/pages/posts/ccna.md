---
layout: ../../layouts/PostLayout.astro
title: "CCNA theory and notes"
publishDate: 14 September 2023
description: "Why have a notebook when you have a personal website?"
author: "Stefan Asandei"
tags: []
---

I am pursuing a CCNA (Cisco Certified Network Associate) course and I decided to write my notes in markdown. This website also serves as a great way to easily share my work. These are all my personal writings, so if you find any mistake, don't hesitate to contact me so I can fix it!

## 1. Introduction

Types of networks, by model:

- Client - Server: the client requests content which is processed and sent by the server
- Peer to peer: each device can be either a client or a server, no dedicated server is required

Types of networks, by dimension:

- LAN = Local Area Network (home, school, company size)
- MAN = Metropolitan Area Network (multiple LANs)
- WAN = Wide Area Network (biggest one, multiple MANs)
- WLAN = Wireless LAN
- SAN = Storage Area Network
- PAN = Personal Area Network (Bluetooth)

Types of networks, by destination:

- Home (cable, cellular network, satellite, dial-up)
- Business (metro ethernet, business DSL, satellite)

Business networks:

- intranet: accessible only inside the business
- extranet: resources accessible to the outside users
- internet: both

Properties of a network:

- fault tolerance
- scalability
- quality of service: prioritize traffic based on its type (example: voice > video)
- security

Type of network attacks:

- viruses, worms, and trojan
- spyware, adware
- zero-day attacks
- denial of service

Networking trends:

- BYOD = bring your own device
- online coworking
- cloud computing
- powerline networking
- IoT = Internet of Things
- SDN = Software-defined Networking

Key questions:

- What's a network?
- How to represent a network?

## 2. Communication Protocols

Protocol = a set of rules (such as language, message format, message dimension, transmission speed)

A message protocol may contain the address source, destination source and the rest of the data.

Delivery options:

- Unicast: communication one-to-one (1 source, 1 destination)
- Multicast: 1 source, multiple destinations
- Broadcast: 1 source, everyone else in my network is listening

Protocol stacks: separation of concerns

The TCP/IP stack (simplified):

- Application: user interaction
- Transport: data communication between devices
- Network: find the best route between two devices
- Environment Access: hardware communication

The OSI stack:

- Application: user interaction
- Presentation: uniform data representation
- Session: keep communication alive between two devices
- Transport: segment data and send packets
- Network: find the best route between two devices
- Data link: communication between devices within the same environment
- Physical: from bits to hardware communication

Standard = document that provides information on how a protocol is defined

RFC = Request for Comments (developed by IETF)

IP = Internet protocol

ISO = International Organization for Standardization

IEEE = Institute of Electrical and Electronics Engineers

Transmission methods:

- segmentation: gets split into ordered packets such as 1, 2, 3, 4, ...
- multiplexing: merge different sources in order such as 1, 1, 2, 2, ...

Key questions:

- How do multiple devices communicate?
- What is a communication protocol?

## 3. IOS Configuration

IOS = Internetwork Operating System, Cisco's operating system which runs on their devices

Components of an operating system:

- shell: interface which allows the user to interact with the OS
- kernel: enables communication between the hardware and the OS
- hardware: the physical components of a device

Two ways to interact with an OS:

- GUI = Graphics User Interface
- CLI = Command Line Interface

Fun fact: Apple negotiated with Cisco the rights for the name "IOS" since Cisco owns the trademark: [link](https://support.apple.com/guide/shortcuts/copyright-apd19e3e6994/ios#:~:text=IOS%20is%20a%20trademark%20or,by%20Apple%20is%20under%20license.).

IOS Features:

- security
- quality of service (QoS): prioritize traffic based on its type (example: voice > image)
- routing: find the best route for a packet
- resources: memory, battery, etc.
- addressing: configure different addresses for the network
- interfaces: read port values

CLI Access:

- Direct:
  - console port
  - AUX port: deprecated
- Remote:
  - Telnet
  - SSH: secure shell, data is encrypted (which makes it better than telnet)

### IOS hierarchy:

IOS has multiple modes, for various configuration use cases

Modes:

- User EXEC (>): default mode
- Privileged EXEC (#): enabled with the command
  "`enable`"
  - Global config: "configure terminal"
    - Interface: "interface interf-name interf-number", example names: fa0/1, gig0/0
    - Line: "interface line-name line-number"
    - Router: "router routing-protocol-name"

Other commands:

- exit to go back one mode
- end to go back to the root mode

### Common commands:

- How to change the hostname:

  ```
  Router> enable
  Router# configure terminal
  Router(config)# hostname Constanta
  Constanta(config)# exit
  Constanta#
  ```

  The hostname must contain only alphanumeric characters and/or "-".

- How to change the password:

  Unencrypted:

  ```
  Constanta> enable
  Constanta# configure terminal
  Constanta(config)# enable password cisco
  Constanta(config)#
  ```

  Encrypted:

  ```
  Constanta> enable
  Constanta# configure terminal
  Constanta(config)# enable secret cisco
  Constanta(config)#
  ```

  On a direct connection:

  ```
  Constanta> enable
  Constanta# configure terminal
  Constanta(config)# line console 0
  Constanta(config-line)# password cisco
  Constanta(config-line)# login
  ```

  On a remote connection:

  ```
  Constanta> enable
  Constanta# configure terminal
  Constanta(config)# line vty 0 15
  Constanta(config-line)# password cisco
  Constanta(config-line)# login
  ```

PDU = packet data unit

## 4. Physical layer

The physical layer, the first one of the OSI stack, works with bits.

The PDUs of the OSI stack layers:

| Hardware   | Layer        | PDU     |
| ---------- | ------------ | ------- |
| Hub        | Physical     | Bits    |
| Switch     | Link         | Frames  |
| Router     | Network      | Packet  |
|            | Transport    | Segment |
|            | Session      | SPDU    |
|            | Presentation | SPDU    |
| EndDevices | Application  | APDU    |

Physical Layer properties:

- transforms the received frames in bits
- sends the data as signals
- receives signals from the environment, sends them back as bits
- sends data to layer 2

How it converts the bits as signals:

- copper: Electricity
- optical fiber: light
- wireless: radio

Network devices:

- NIC = Network Interface Card, connects the equipment to the network
- Interface = the port
- Cable = connects the devices
- Connector = the end of a cable

Specific terms:

- Bandwidth:
  - the maximum theoretical speed of a network
  - bps = bits per second
  - we can limit the bandwidth of a specific app
- Throughput:
  - the actual number of transmitted bits
  - always smaller than the bandwidth
  - bps
- Latency:
  - the time it takes for the data to reach the destination
  - seconds
- Goodput:
  - number of useful bits transmitted in a period of time
  - smaller than throughput

Copper cables:

- 2 types:
  - UTP = unshielded twisted pair
  - STP = shielded twisted pair
- connectors:
  - RJ-45
- cabling standards:
  - T568A: from the USA
  - T568A: from the EU
- interferences:
  - EMI + RFI
  - crosstalk

Cabling standard rules:

- full color + color with white
- always brown cables at the end
- always blue in the middle
- T568A:
  - | 1       | 2     | 3        | 4    | 5      | 6      | 7       | 8     |
    | ------- | ----- | -------- | ---- | ------ | ------ | ------- | ----- |
    | \*green | green | \*orange | blue | \*blue | orange | \*brown | brown |
- T568B:
  - | 1        | 2      | 3       | 4    | 5      | 6     | 7       | 8     |
    | -------- | ------ | ------- | ---- | ------ | ----- | ------- | ----- |
    | \*orange | orange | \*green | blue | \*blue | green | \*brown | brown |
- - before a color means it's combined with white

Cabling types:

- straight-through cables:
  - both ends use the same standard
  - between different equipments
  - host <-> switch
  - switch <-> router
- crossover cables:
  - between equipments of the same type

Fiber optic:

- types:
  - single mode (SMF)
  - multi mode (MMF)
- structure:

  - core
  - coating
  - outer jacket

- connectors:

  - straight-tip (ST)
  - subscriber connector (SC)
  - lucent connector (LC)

- can't be affected by interferences
- testing can be done with an OTDR

Fiber vs. Copper:

| Crietiria     | Copper         | Fiber             |
| ------------- | -------------- | ----------------- |
| bandwidth     | 10Mbps-10Gbps  | 10Mbps-100Gbps    |
| distance      | small(1m-100m) | large(1m-100000m) |
| interferences | EMI            | nope              |
| cost          | low            | high              |
| instalation   | easy           | hard              |

Wireless:

- types: WiFi, Bluetooth, WiMax, Zigbee

Bit encodings:

- NRZ = Non-Return to Zero, 1 when a certain voltage is exceeded, otherwise 0
- Manchester = map a voltage range (-v to +v) from 0 to 1
