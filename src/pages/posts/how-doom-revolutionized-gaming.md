---
layout: ../../layouts/PostLayout.astro
title: Tricks used in the original Doom
publishDate: 20 July 2022
description: Seeing the various ways the id Software engineers used in the 90's.
author: "Stefan Asandei"
tags: []
---

Doom is a first-person shooter game released in 1993 by id Software. It pioneered online distribution, because of it was distributed freely as a shareware. The community was able to create mods, since the game was using WAD files for the level, which made modding much easier. The source code was also released in 1997 under GPL v2. Its most important contributions are to 3D rendering, thanks to id's previous game: Wolfenstein 3D. Now, let's dive into each area influenced (and some cool hacks) by the original Doom game.

## Game modding

Mods are modifications added to a game, created by its players. They can be created by reverse engineering the game, which takes a lot of time and effort, injecting custom code at runtime in the client, or by messing with the game files. Various approuches but you end up with the same result, a new fun experience you and your friends can enjoy, in a game you already own and like. In Doom, levels and resources are serialized in WAD files, those can be manipluated and replaced, thus having an easy way to modify the game. Well known mods for Doom include Bloom, Eternal Doom, Icarus and Requiem. Players were able to download those mods from the internet, which was unheard of at the time.

## Ray casting

Ray Casting is a tehnique used to render a 3D world from a 2D map. It was first used in Wolfenstein 3D, but it was improved in Doom. It's very fast since it needs to be run only for every vertical line of the screen.
However, it has its limitations such as the player not being able to look up or down, although it can be achieved using with some hacks. Games at the time were either rendering very slowly in 3D, many times only wireframe, so Doom was really looking "next-gen".

For a basic ray caster, the map consists of a 2D array with either 1s (it's a wall) or 0s (empty). For every X coordonate of the screen cast a ray, starting from the player position. If it intersects with a wall, we draw a vertical line filling that whole X coordonate range.

```
-----------------
|   WWWWWWWWWW  |
|    | /     W  |       P - player
|    |/      W  |
|    P ----- W  |       W - wall
|            W  |
-----------------
```

The use of ray casting allowed Doom to run on a wide ranges of PCs at the time, since most could only do software rendering.

## Binary Space Partitioning

Binary Space Partitioning (BSP) is a method for partitioning a space by recursively subdiving it into two convex sets. It's usually represented using a graph structure. Here it is an example (simplified for the ease of explanation):

```
-------------      -------------      -------------
|           |      |     |     |      |  D  |     |
|     A     |  =>  |  B  |  C  |  =>  |-----|  C  |  =>  ...
|           |      |     |     |      |  E  |     |
-------------      -------------      -------------

    A
   / \
  B   C
 / \
D   E
```

Here it is a youtube video showcasing how Doom used BSP in its map editor: [https://youtu.be/iqKrbF6PxWY](https://youtu.be/iqKrbF6PxWY)

## Fast Inverse Square Root

This algorithm was actually written later, for Quake III, but since that was developed by the same studio, I think it's appropiate to discuss about it here.

```c
float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
}
```

## Conclusion

The 90's were just different, software development was more open and there was a lot of space for improvements in the algorithms. Programmers had a stronger math background, leading to smarter thinking and more advanced algorithms.
