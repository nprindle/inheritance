# How To Add Tools

To create a new tool, add a new file in the `tools` directory. (Please name it something descriptive!)

Your file should fit this sort of format:
```
/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('toolname',
  //tool constructor goes here
);
```
