//
// CopyCoordinates.jsx - a script for Adobe® InDesign®
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

function copyCoordinates() {

    var document;
    var savedRulerOrigin;

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
        
            var anchorPoint = app.activeWindow.transformReferencePoint;         
            var horizontalMeasurementUnits = document.viewPreferences.horizontalMeasurementUnits;
            var verticalMeasurementUnits = document.viewPreferences.verticalMeasurementUnits;

            savedRulerOrigin = document.viewPreferences.rulerOrigin;

            document.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;

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
            var reference = "{" + 
                "x:" + referencePoint[0] + "," +
                "y:" + referencePoint[1] + "," + 
                "hm: MeasurementUnits." + horizontalMeasurementUnits.toString() + "," + 
                "vm: MeasurementUnits." + verticalMeasurementUnits.toString() + "," + 
                "a:AnchorPoint." + anchorPoint.toString() +
            "}";
            app.insertLabel("com.rorohiko.coordinates.paste", reference);
            
        }
        catch (err) {

        }

    }
    while (false);

    if (document && savedRulerOrigin) {
        document.viewPreferences.rulerOrigin = savedRulerOrigin;
    }

}

app.doScript("copyCoordinates()", ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT, "Copy Coordinates");
