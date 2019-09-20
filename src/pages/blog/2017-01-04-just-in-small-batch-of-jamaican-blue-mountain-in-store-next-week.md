---
templateKey: blog-post
title: 'Serverless: ¿Es tan barato como dicen?'
date: 2019-09-20T15:04:10.000Z
description: >-
  We’re proud to announce that we’ll be offering a small batch of Jamaica Blue
  Mountain coffee beans in our store next week.
featuredpost: true
featuredimage: /img/home-jumbotron.png
tags:
  - jamaica
  - green beans
  - flavor
  - tasting
---

>Summary: Unless you are operating at massive scale, Serverless is not just cheap, it's a steal. You should get started today.
One of the most compelling reasons people often give for using Serverless, is cost.


In a Serverless app, you only pay when the app is running. Which sounds awesome! Why pay for an app that's up all the time if you can get away with only paying for it while it's busy?

I mean, you don't just leave the water running at your house. You turn it on when you need it and off when you don't. Unless you're my kids. Then you wash your hands and just leave the water running because you have a 3 second attention span and LET'S GO PLAY MINECRAFT!

Running faucet

Serverless sounds like a steal. Like get on this deal before someone realizes what's happening and changes the rules. But how cheap is Serverless really?

I mean, come on; what's the catch.

Breaking down the cost of Azure Functions
When you look at the cost of Serverless, it definitely appears to be dirt cheap. Like, how-can-anyone-make-any-money-off-of-this cheap. For instance, Azure Functions consumption plan charges you (monthly) for three things:

Executions
Execution Time
Storage
Executions are pretty easy to understand: how many times did your Function execute? You get charged 20 cents per million executions. Which, wow. That seems like it's basically free. On top of that, you get the first million executions free every month.

To put that in perspective, your Function could run 32,258 time per day and it would cost you ZILCH. That's 22 times per minute. If you executed your function every second of every day that's 2.628e+6 times - or 2,628,000 times. THAT'S NOT EVEN 40 CENTS.

But executions are not the only thing you get charged for. You also get charged for Execution Time.

Execution Time is a bit harder to quantify in your head. It's basically a charge for how much resources your Function uses while it's executing, and for how long it uses it. This is called GB-s. Or, "gigabyte Seconds".

Here's how it works: Whenever your Function executes, Azure calculates how much memory it is using rounded up to the nearest 128MB. So if your Function only uses 25MB of memory, it counts as 128. It also calculates how long it ran, rounded up to the nearest 100 milliseconds.

So if you have a dead simple "Hello World" Serverless Function, that's going to count for 128MB of memory every time it runs, or, .125 gigabtyes. To get to the execution cost, you take the total number of executions, and multiply it by how long it took the function to execute. For "Hello World", this is going to be 100ms, because that's the least amount it can ever be.

Now assume that you run that function every second of every day. We've already said that's 2,628,000 times. You take that number and you multiple it by the number of milliseconds that it took the Function to run (100ms).
2,628,000 * .100
That gives us 262,280. We now have to take this number and multiply it by how much memory the Function used each time it ran, which we already said was .125.
262,800 * .125
This equals 32,850. OK, so the total Execution Time is 32,850 GB-s. How much does that cost us?

Nothing. Because you get the first 400K GB-s for free.

Alright. OK. So all those executions cost us 40 cents, and the execution time costs us nothing. This seems like a complete win-win. Who put this business model together?

Storage is how much storage your code uses up. Behind the scenes, Azure uses an Azure Storage account to put your code, any trigger logic and any queues you might be writing to.

If you are storing just your code, that's basically nothing. Azure Storage costs don't even begin to kick in until you've hit the first gigabyte. If you being to store lots and lots of data in queues, it could start to go up, but even then, you'd need to be using lots of it. Just keep in mind that storage is not free, but it almost is.

At this scale, Serverless is almost paying us to use it. But what happens when we scale up? Like way up?

Facebook scale
Let's assume for a minute that we're dealing with traffic that's Facebook-sized. That's a hard number to pin down, but Facebook reports that every second, 510K comments are posted, 293K status updates are made and 136K photos are uploaded. That's not even close to being all the traffic, but if we take just those 3 things, that's 939K executions per second.

How many executions a month is that?
939,000 * 60 (seconds in a minute) * 60 (minutes in an hour) * 24 (hours in a day) * 30 (days in a month)
Which gives us 2.43389e12. I don't even now how to say that number. At 20 cents per million executions (with the first million free)...
(2.43389e12 - 1,000,000 free executions ) / 1,000,000 ) * .20 cents per execution
Ready for it? $486,777.40. Don't forget the forty cents.

That's just execution cost. Now let's add in Execution Time.

To do that, we need to know how long do these operations take. Posting a comment might take less than a second, but uploading a photo might take several seconds. Let's just use 1 second as a nice, round, arbitrary number for all 939K executions. To figure out how many executions this is per month..
2.43389e12 * 1
You can probably do that in your head. I almost could.

Now how much memory do these operations consume? It depends on how much code is being loaded up into memory on the server. This is hard to know, but let's just leave it at 128MB. That seems like a large number. I feel like you could load a hefty Function at that size.

So our final equation is...
2.43389e12 * .125
This gives us 3.04236e11 GB-s. We get the first 400K GB-s for free. After that it's 0.000016/GB-s.
(3.04236e11 - 400,000 free GB-s) * 0.000016 per GB-s
That gives us $4,867,769.60 in Execution Time cost. So the total bill is...
486,777.40 execution cost + 4,867,769.60 execution time
For a whopping total of $5,354,547. Per month. Every month. And we didn't even get close to what Facebook is actually doing.

So just over 5 million per month? Is that all?

No. That's not all.

All about the bandwidth
Bandwidth charges apply to everything that you do in the cloud. That includes Serverless functions. If you have your own data center, you are paying for bandwidth. If you are running it in the cloud, you are paying for bandwidth. Either way, bandwidth.

So how much is bandwidth? Azure charges for bandwidth on a sliding scale. The more you use, the cheaper it gets. You get the first 5 GB free. Then it costs 8.7 cents per GB of bandwidth for 5GB - 10TB. Then it goes down to 8.3 cents for the next 40 TB and on and on until you get over 150 TB and it drops to 5 cents per GB.

How much bandwith do you think Facebook uses? Eek. I don't think I can even do this calculation. I wouldn't even know where to start. But I can bet you it's going to be way more than that 5.3 million monthly execution cost.

This is why Facebook has their own data centers. At some point, you get so big that it makes sense that you just become your own cloud.

But you are probably not your own cloud, so back to reality. We still haven't answered the question of how expensive Serverless is or isn't for a "typical" application. Let's do that.

A typical Serverless cost
My friend and I wrote an application a while back that is used by a few folks, but overall is not a heavily used application. It's fielding around 20K request per month.

Without even looking we know that the cost of our executions is free. We're nowhere close the million mark.

Here's our cost dashboard for the last 30 days.

Serverless Cost Dashboard

We are in fact paying zilch to host and execute this application. Nothing. It is completely free.

The bandwidth charges we are incurring. This is because our Serverless application is an API, so it's sending data out of Azure. If this was a microservice that was just moving data around within the same region in Azure, our bandwidth cost would be zero too. That's where Serverless is really an amazing deal.

The real deal
So is the cost of Serverless over-hyped?

No. It's for real. Until you reach a sizeable scale, you'll pay very little if anything at all. Serverless is one of the most remarkable technologies to come your way in quite some time. Couple that with the automatic infinite scaling and the fact that you don't even have to deal with a runtime anymore, and this one is a no-brainer.
