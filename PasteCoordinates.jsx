//
// PasteCoordinates.jsx - a script for Adobe® InDesign®
//
// © 2019-2020, Rorohiko Ltd.
//
// Part of a set of scripts for Adobe® InDesign®
//
// CopyCoordinates.jsx
// PasteCoordinates.jsx
// PasteSameReferencePointCoordinates.jsx
// 
// v 1.0.2, April 18, 2020
// 
// by Kris Coppieters kris@rorohiko.com
// https://www.linkedin.com/in/kristiaan/
// 
// Documentation and Setup Instructions:
// 
// https://github.com/zwettemaan/InDesignCopyPasteCoordinates/wiki
//
// MIT License
// 
// Copyright (c)2019-2020 Kris Coppieters
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// ----------------
// 
// About Rorohiko:
// 
// Rorohiko specialises in making printing, publishing and web workflows
// more efficient.
// 
// This script is a free sample of the custom solutions we create for our
// customers.
// 
// If your workflow is hampered by boring or repetitive tasks, inquire at
// 
// sales@rorohiko.com
// 
// The scripts we write for our customers repay for themselves within weeks
// or months.
// 
// ---------------
// 
// About these scripts:
// 
// Select a single page item, and with the page item still selected, run
// the CopyCoordinates.jsx script. It will copy the coordinates of the page
// item, ready to be pasted back in.
// 
// You can then select another page item, and paste the coordinates 'into'
// that page item.
// 
// This script uses the current reference point settings. This is managed
// via the little 'square' with 9 dots which will be visible most of the
// time in the upper-left-hand-corner of the InDesign window.
// 
// By selecting one of these 9 dots, you can determine which point's
// coordinates will be copied or pasted: top-left, top-middle, top-right,
// middle-left, center, middle-right, etc...
// 
// The PasteCoordinates.jsx script can paste these coordinates.
// 
// You may change the selected reference point before pasting by selecting
// another of the 9 points.
// 
// Doing so makes it is possible to copy one corner from a page item and
// paste it into another corner of the same or of another page item.
// 
// The PasteSameReferencePointCoordinates.jsx script is similar, but it
// will ignore the current reference point settings when pasting.
// 
// E.g. if you copy the top-left corner, this variant of the Paste....jsx
// script will paste back in the top-left corner, even if a different point
// gets selected amongst the 9 reference points.
// 
// To make this set of scripts efficient to use, it is highly recommended
// that you set up some keyboard shortcuts from them.
// 

function pasteCoordinates() {

    var document;
    var savedAnchorPoint;
    var savedRulerOrigin;
    var savedHorizontalMeasurementUnits;
    var savedVerticalMeasurementUnits;

    do {

        try {
            if (app.documents.length == 0) {
                break;
            }

            document = app.activeDocument;
            if (! (document instanceof Document)) {
                break;
            }

            if (! app.selection || app.selection.length != 1) {
                break;
            }

            var item = app.selection[0];
            if (! ("anchoredObjectSettings" in item)) {
                break;
            }

            if (! item.isValid) {
                break;
            }
        
            var referenceExp = app.extractLabel("com.rorohiko.coordinates.paste");
            if (! referenceExp) {
                break;
            }

            var reference;
            eval("reference = " + referenceExp + ";");

            reference = eval(reference);

            var anchorPoint = app.activeWindow.transformReferencePoint;
            
            savedRulerOrigin = document.viewPreferences.rulerOrigin;
            savedHorizontalMeasurementUnits = document.viewPreferences.horizontalMeasurementUnits;
            savedVerticalMeasurementUnits = document.viewPreferences.verticalMeasurementUnits;          

            document.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
            document.viewPreferences.horizontalMeasurementUnits = reference.hm;
            document.viewPreferences.verticalMeasurementUnits = reference.vm;

            var top = item.geometricBounds[0];
            var bottom = item.geometricBounds[2];
            var left = item.geometricBounds[1];
            var right = item.geometricBounds[3];

            var referencePoint = [];
            switch (anchorPoint) {
                case AnchorPoint.BOTTOM_CENTER_ANCHOR:
                    referencePoint[0] = (right + left) / 2;
                    referencePoint[1] = bottom;
                    break;
                case AnchorPoint.BOTTOM_LEFT_ANCHOR:
                    referencePoint[0] = left;
                    referencePoint[1] = bottom;
                    break;
                case AnchorPoint.BOTTOM_RIGHT_ANCHOR:
                    referencePoint[0] = right;
                    referencePoint[1] = bottom;
                    break;
                case AnchorPoint.CENTER_ANCHOR:
                    referencePoint[0] = (right + left) / 2;
                    referencePoint[1] = (top + bottom) / 2;
                    break;
                case AnchorPoint.LEFT_CENTER_ANCHOR:
                    referencePoint[0] = left;
                    referencePoint[1] = (top + bottom) / 2;
                    break;
                case AnchorPoint.RIGHT_CENTER_ANCHOR:
                    referencePoint[0] = right;
                    referencePoint[1] = (top + bottom) / 2;
                    break;
                case AnchorPoint.TOP_CENTER_ANCHOR:
                    referencePoint[0] = (right + left) / 2;
                    referencePoint[1] = top;
                    break;
                case AnchorPoint.TOP_LEFT_ANCHOR:
                    referencePoint[0] = left;
                    referencePoint[1] = top;
                    break;
                case AnchorPoint.TOP_RIGHT_ANCHOR:
                    referencePoint[0] = right;
                    referencePoint[1] = top;
                    break;
            }

            var distanceX = reference.x - referencePoint[0];
            var distanceY = reference.y - referencePoint[1];

            item.move(undefined,[distanceX, distanceY]);
            
        }
        catch (err) {           
        }

    }
    while (false);

    if (document) {
        if (savedRulerOrigin) {
            document.viewPreferences.rulerOrigin = savedRulerOrigin;
        }
    
        if (savedHorizontalMeasurementUnits) {
            document.viewPreferences.horizontalMeasurementUnits = savedHorizontalMeasurementUnits;
        }

        if (savedVerticalMeasurementUnits) {
            document.viewPreferences.verticalMeasurementUnits = savedVerticalMeasurementUnits;
        }
    }
}

app.doScript("pasteCoordinates()", ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "Paste Coordinates");
