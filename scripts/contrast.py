#!/usr/bin/env python3
"""Contrast + hue helper. This repo has published a wrong ratio twice (lib/themes.ts
records both corrections), so ratios get computed, never asserted."""
import sys, colorsys

def srgb(c): c/=255.0; return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def lum(h):
    h=h.lstrip('#'); r,g,b=(int(h[i:i+2],16) for i in (0,2,4))
    return 0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(b)
def ratio(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb)
    return (hi+0.05)/(lo+0.05)
def hue(h):
    h=h.lstrip('#'); r,g,b=(int(h[i:i+2],16)/255 for i in (0,2,4))
    return round(colorsys.rgb_to_hsv(r,g,b)[0]*360)

if __name__=="__main__":
    args=sys.argv[1:]
    if len(args)>=2 and all(a.startswith('#') for a in args[:2]):
        a,b=args[0],args[1]
        print(f"{a} on {b}: {ratio(a,b):.2f}:1   hue({a})={hue(a)}deg")
    else:
        for a in args: print(f"{a}  hue={hue(a)}deg  lum={lum(a):.4f}")
