---
layout: ../../layouts/PostLayout.astro
title: "CCNA theory and notes"
publishDate: 14 September 2023
description: "Why have a notebook when you have a personal website?"
author: "Stefan Asandei"
tags: []
---

I am pursuing a CCNA course and I decided to write my notes in markdown. This websites also serves as a great way to easily share my notes. These are all my personal notes, so if you found any mistake, don't hesitate to contact me so I can fix it!

## 1. Introduction

Types of networks, by model:

- Client - Server: the client requests content which is processed and sent by the server
- Peer to peer: each device can be either a client or a server, no dedicated server required

Types of networks, by dimension:

- LAN = Local Area Network (home, school, company size)
- MAN = Metropolitan Area Network (multiple LANs)
- WAN = Wide Area Network (biggest one, multiple MANs)
- WLAN = Wireless LAN
- SAN = Storage Area Network
- PAN = Personal Area Network (Bluetooth)

Types of networks, by destination:

- Home (cable, celular network, satelite, dial-up)
- Business (metro ethernet, business DSL, satelite)

Business networks:

- intranet: accesibile only inside the business
- extranet: resources accesible to the outside users
- internet: both

Properties of a network:

- fault tolerance
- scalability
- quality of service: prioritize traffic based on its type (example: voice > video)
- security

Type of network attacks:

- viruses, worms and trojan
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

A message procol may contain the address source, destination source and the rest of the data.

Delivery options:

- Unicast: communication one to one (1 source, 1 destination)
- Multicast: 1 source, multiple destinations
- Broadcast: 1 source, everyone else in my network is listening

Protocol stacks: separation of concerns

The TCP/IP stack (simplified):

- Application: user interaction
- Transport: data communication between devices
- Network: find the best route between two devices
- Enviorment Access: hardware communication

The OSI stack:

- Application: user interaction
- Presentation: uniform data representation
- Session: keep communication alive between two devices
- Transport: segment data and send packets
- Network: find the best route between two devices
- Data link: communication between devices within the same enviorment
- Physical: from bits to hardware communication

Standard = document that provides information on how a protocol is defined

RFC = Request for Comments (developed by IETF)

IP = internet protocol

ISO = International Organization for Standardization

IEEE = Institute of Electrical and Electronics Engineers

Transmission methods:

- segmentation: gets split into ordered packets such as 1, 2, 3, 4, ...
- multiplexing: merge different sources in order such as 1, 1, 2, 2, ...

Key questions:

- How do multiple devices communicate?
- What is a communication protocol?
