---
authors:
  - Jan Gosmann
  - Chris Eliasmith
year: 2017
date: 2017-05-04
journal: "Frontiers in Neuroinformatics"
pdfurl: "https://www.frontiersin.org/articles/10.3389/fninf.2017.00033/pdf"
exturl: "https://www.frontiersin.org/articles/10.3389/fninf.2017.00033/full"
title: "Automatic Optimization of the Computation Graph in the Nengo Neural Network Simulator"
---

One critical factor limiting the size of neural cognitive models is the time
required to simulate such models. To reduce simulation time, specialized
hardware is often used. However, such hardware can be costly, not readily
available, or require specialized software implementations that are difficult to
maintain. Here, we present an algorithm that optimizes the computational graph
of the Nengo neural network simulator, allowing simulations to run more quickly
on commodity hardware. This is achieved by merging identical operations into
single operations and restructuring the accessed data in larger blocks of
sequential memory. In this way, a time speed-up of up to 6.8 is obtained. While
this does not beat the specialized OpenCL implementation of Nengo, this
optimization is available on any platform that can run Python. In contrast, the
OpenCL implementation supports fewer platforms and can be difficult to
install.
