---
layout: ../../layouts/PostLayout.astro
title: "Building a real web product"
pubDate: 8 June 2023
description: "Didn't expect to be this hard!"
author: "Stefan Asandei"
tags: []
---

Let's start with the backstory: A month ago I started building kind of a small startup. It all started when my teacher recommended me to go to a competition for website creation, hackathon style. I built a quick prototype for the idea I had, and I won on the first place in my city. Now I'm going to the national phase in Romania, and I decided to go big with my idea. As it's the summer holyday, I'm working "full time" daily on this. At the moment I'm at over 80 commits, but it feels like I still have so much work to do.

## The pitch

Let's see what this is all about: a social network for programmers. Fancy words, I know, but it's really just the product I feel we need for years. It's all about convinience, having all the things in one place. If I were to describe it in terms of combining products from big companies, it's briefly about a LeetCode + Discord + Brilliant. A proper online platform where people can discuss, learn and practice programming. Discord used to be very close to this, but since 2020 it's only getting worse and worse. There's also the fact that I'm very into competitive programming, only problem is there is no platform that has all the features I want. CodeForces has good content but it's outdated + no editor, LeetCode is more focused on interviews, AlgoExpert is paid, and I could go on and on and on with this.

Some of you may wonder why did I give away my idea? After all the work I put in, I strongly consider that execution is everything. If you've read this article and you want to go and write a better version of this, go try. There are already tens of aproximate products of this online, I don't think it's that revolutionary. My main selling point is the execution, how well everything is connected and _it just works_. Of course this requires way too much work, but I think it's worth it. I'm learning A LOT along the way, gaining experience, practicing web dev and having something real to work on. This project is open source btw, at my stage in life I can afford to care more about my software being free (as in freedom) making a real impact, than making a profit.

## The challanges

I built the prototype in about 2 weeks using SolidStart. I definetly wasted a lot of time learning the framework, but it opened my mind to more data fetching patterns. Actually Made me start thinking about how data flows through my application and how should I use caching. After this experience, I decided to go with a more battle tested stack: the T3 stack. This was actually a calculated decision, based on my previous experiences with SoldiStart and SvelteKit, it's not about the hype. Yes I decided to use React. Can't say it's nice to work with, but it has such a big community, with libraries for everything you'd ever need. If I run into an error, I have other resources than the docs (which are great btw), unlike Solid which felt unexistent on the internet.

Now I mostly fight with Prisma. Thought about switching to Drizzle, but that's to bleeding edge even for me. I mainly have issues with the scheme language and, of course, big performance issues. Not only cold starts (which should be solved with the new json protocol), but also with basic queries, definetly needs more investigating in the future.

Other issue I had was regarding optimistic updates (since mutations were so slow). TRPC uses React query under the hood, so I checked the docs for that. And it turns out I kinda have to run my own layer of optimistic updates inside methods like onSuccess or onError. Tried to do that with React state and useEffect, but didn't definetly work. This is also a thing I will have to revisit in the future.

## How it's going

It's definetly a slow and hard process. Everyday I work as much as I can, but it still feels like it will never end. Recently had a chat with a friend regarding ShaderToy, it works for what it's supposed to, but the editor can be better and the UI isn't overall satisfying. I wanted to suggest "let's use my thing!", however I knew I'm still not close to even a close beta. My TODO list has at the moment about 40 items (general ideas which will require to be split into multiple steps). This project has to be done until the 20 July. I don't know how, but I'm going to do it, I need to win the nationals for free marketting. At the moment, I have no plans to make money from this, I just want to build the greatest tool possible for our community.

## The motivation

I already showed the prototype to a couple of teachers in my city, especially from my high school, and they're all impressed. My high school should start incorporating this platform into teaching starting next year. In November this year, I plan to host a contry wide competitive programming contest from students starting from 5th grade all the way to 12th grade. At the moment, the state of computer science taught in high schools in Romania is really bad. Outdated, useless, C++ with a couple of random data structures. I want to open the eyes of students all over the country to the beauty of programming: it's more than gray text on a black background, more than abstract math and logic problems. You can't appreciate the beauty of a computer science problem, without fully understanding all the necesarry concepts. Why start teaching programming with math problems? Build a game, a website, a simple utility, show the students the amazing world of computers, teach them the basics, how all of this works, and only then when they're capable of writing basic logic themselves, start teaching Graph Theory, Divide it impera, Backtracking and all the other random algorithms baked into the romanian school system.

I was first introduced to programming in my free time, at a course about HTML. I was 10 years old and I didn't even know what a folder was. There was a university student who was teaching us. To this day I can't forget his smile, his joy of teaching programming to kids. He was so good at it because he enjoyed the process. This is what gives me power to go on with this passion to this day, his attitude full of joy. I want to add this vibe (tho it can never be the same as the one in person by communicating with people), to this platform. A gentle introduction to programming, for the people, not the experts. Beyond this, of course I want to extend to be a welcoming place for all the levels of programmers, from begginers to advance, but not focused on this inclusion. A place where you can evolve: take an interactive course on a topic you like, use the in-browser editor to have fun with the things you just learned, chat with your friends about it, out of curiosity discover new sides of programming, starting solving a couple of problems, and in the end, build your path towards a computer science career. I like to thing programming is more than just blindly writing algorithms and memorizing structures.

## Conclusion

This is the first part out of a small series I decided to write along this journey. As I said, I'm at a phase where I'm just coding, brainstorming and preparing for the launch day. I am strongly confident I can achieve this goal, of building one of the best platforms for programmers, altought I fully understand it may not become wide spread, hence my lack of marketting. At the moment I'm targetting my friends, very few people from the web/rust community and of course, students from romanian schools. I am very greatul for all of these opportunies, I am happy with this journey, regardless of the destination, since all of the things I'm learning and the experience I'm gaining are invaluable!

Looking forward to seeing the state of the app in the next part!
