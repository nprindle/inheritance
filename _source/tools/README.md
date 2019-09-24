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

## What's it all mean?

The lines like `/// <reference path="../ItemPool.ts" />` are there to tell the compiler that these files (`ItemPool.ts`, `Tool.ts`, and `effects.ts`) need to come before the current file. This is very important; otherwise, the compiler gets mad and says that we're using things before they're declared.

`tools.add()` adds the tool we've just created to the item pool. The `ItemPool` class is sort of a generic container for various things we'd want to pull from (modifiers, enemies, tools, etc.)

`'toolname'` in this instance is the key of the tool we're creating. This is useful in case we ever want to reference this specific tool instead of pulling one randomly from the pool. This can be done with `tools.get('toolname')`.

Then we actually make the tool with something like `new Tool('Tool Name', new Cost(), new NothingEffect())`.

And that's what it all means! :)
