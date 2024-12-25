# LifePod
Project submission for MiniMedi 2024

## Inspiration

As mentioned in our video, the inspiration behind this project was very personal. We had firsthand experience with the issues underlying first aid kits and the first responder system, as one of our teammates almost died due to the issues, after being mauled by a bear.
A large inspiration behind the design of our project are emergency boxes on light poles around our local area and city. These emergency boxes allowed individuals to quickly connect emergency services, however we attempted to expand on this idea, by providing individuals with medical supplies, and a real-time communication network.

## What it does

Lifepod is an innovative first-aid kit that aims to bridge the gap between experienced first-responders and everyday people who are in medical emergencies. Through a GUI and addressable LEDs, an operator can visually guide an end user through tools and medical equipment using light-up LEDs and support the end user in every way possible.

## How we built it

Our frontend was built using ReactJS while our backend consisted of Node.js. As for our hardware, we built the box through hours of soldering, hammering, sawing, and finally coding of an ESP; acting as our IoT device that would send data to the onboard Arduino using cellular data from a phone.

## Challenges we ran into

Throughout the backend, frontend, and hardware development of our project, we ran into numerous issues ranging from typical development bugs to hardware limitations. For example, our solar panel would only output around ~5 watts with full daylight, which is not nearly enough to charge our batteries, power our electronics and LEDs, as well as charge a phone in unison. In addition, we struggled getting Text-to-speech to run on a cellular device, but eventually made it work through Google's TTS API. 

## Accomplishments that we're proud of

We are extremely proud to have finished a full integration of a website with full dashboard and chat capabillities while additionally having an IoT device integrated within our project. Additionally, we are extremely proud of the amount of effort we were able to put together into a finished product.

## What we learned

This hackathon was a large learning experience for the both of us as this has been the first hackathon that we were able to not only finish, but also clean up our code and UI to create the best experience we could provide. Although there are many more features and bugs we need to address, we have gained a vast amount of experience through this hackathon, and that matters more to us. Through a steady paced workflow, we learned that the bulk of challenge wasn't within coding, but rather completing the integrations between backend, frontend, and hardware.

## What's next for LifePod

We have large ambitions for Lifepod and believe that it is an innovation that could revolutionize how everyday people can access and utilize medical supplies. We plan to create the box from metal or 3D printed plastics to ensure that the LifePod is available at all times. In our application we also believe that there are many features we could look to add in the future, such as a chat history, or an AI first responder. Additionally, we plan to utilize PCBs as well as more robust electronics such as raspberry pi's to create an industry standard product. 
If we are given an extended deadline, we believe that we could truly create a project with real-life usage, and one that has the potential to completely replace the first aid kit.