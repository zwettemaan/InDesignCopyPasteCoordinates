# InDesign Copy/Paste Coordinates
```
CopyCoordinates.jsx
PasteCoordinates.jsx
PasteSameReferencePointCoordinates.jsx
```
© 2019-2020, Rorohiko Ltd.

A set of scripts for Adobe® InDesign®

v 1.0.2, April, 2020

by Kris Coppieters kris@rorohiko.com    
https://www.linkedin.com/in/kristiaan/

# Documentation and Detailed Installation Instructions:

https://github.com/zwettemaan/InDesignCopyPasteCoordinates/wiki

# About Rorohiko:

Rorohiko specialises in making printing, publishing and web workflows
more efficient.

This script is a free sample of the custom solutions we create for our
customers.

If your workflow is hampered by boring or repetitive tasks, inquire at

sales@rorohiko.com

The scripts we write for our customers repay for themselves within weeks
or months.

# About These Scripts:

Select a single page item, and with the page item still selected, run
the `CopyCoordinates.jsx` script. It will copy the coordinates of the page
item, ready to be pasted back in.

You can then select another page item, and paste the coordinates 'into'
that page item.

This script uses the current reference point settings. This is managed
via the little 'square' with 9 dots which will be visible most of the
time in the upper-left-hand-corner of the InDesign window.

By selecting one of these 9 dots, you can determine which point's
coordinates will be copied or pasted: top-left, top-middle, top-right,
middle-left, center, middle-right, etc...

The `PasteCoordinates.jsx` script can paste these coordinates.

You may change the selected reference point before pasting by selecting
another of the 9 points.

Doing so makes it is possible to copy one corner from a page item and
paste it into another corner of the same or of another page item.

The `PasteSameReferencePointCoordinates.jsx` script is similar, but it
will ignore the current reference point settings when pasting.

E.g. if you copy the top-left corner, this variant of the `Paste…jsx`
script will paste back in the top-left corner, even if a different point
gets selected amongst the 9 reference points.

To make this set of scripts efficient to use, it is highly recommended
that you set up some keyboard shortcuts from them (see below).

# Installing The Scripts:

Start Adobe InDesign
  
Make the _Scripts_ Panel show up (_Window - Utilities - Scripts_ menu)

Right-click or Option-Click the line that says _User_

Select _Reveal in Finder_ or _Reveal in Explorer_ from the contextual menu

A folder/directory window _Scripts_ should show up.

Double-click the subfolder _Scripts Panel_ so it opens.

Drag the three icons for the script files
```
CopyCoordinates.jsx
PasteCoordinates.jsx
PasteSameReferencePointCoordinates.jsx
```
into this _Scripts Panel_ folder.

Make sure to drag into _Scripts Panel_ and not into _Scripts_.
  
Switch back to InDesign. The scripts should now be listed 'inside' the
_User_ entry on the _Scripts_ Panel.

# Assigning Keyboard Shortcuts:

Select the _Edit - Keyboard Shortcuts…_ menu item

Click _New Set_ on the right

Name the set as you like (e.g. _CopyPasteCoordinatesSet_).

Select Product Area _Scripts_

Scroll until you see the three scripts listed (probably way down at the end)

Click _User: CopyCoordinates.jsx_

Click in the _New Shortcut:_ field

Hit the three keys _Ctrl-Shift-C_ simultaneously

Click _Assign_

Click _User: PasteCoordinates.jsx_

Click in the _New Shortcut:_ field

Hit the three keys _Ctrl-Shift-V_ simultaneously

Click _Assign_

Click _User: PasteSameReferencePointCoordinates.jsx_

Click in the _New Shortcut:_ field

Hit the four keys _Ctrl-Opt-Shift-V_ or _Ctrl-Alt-Shift-V_ simultaneously

Click _Assign_

Click _OK_
