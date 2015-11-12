var m;
var mem8;
var mem32;

function puts(p) {
  var s = '';
  while (mem8[p] != 0)
    s += String.fromCharCode(mem8[p++]);
  print(s);
}

function sqrtF32(value) {
  return Math.fround(Math.sqrt(value));
}

function writeByte(b) {
  var s = b.toString();
  while (s.length < 3) {
    s = " " + s;
  }
  write(s);
}

function flipBuffer(p, w, h) {
  print("P3");
  print(w + " " + h);
  print("255");
  print("# This is a PPM file, redirect stdout to view.");
  for (var j = 0; j < h; j++) {
    for (var i = 0; i < w; i++) {
      if (i != 0) write("  ");
      var pixel = mem32[p>>2];
      writeByte((pixel >> 0) & 255);
      writeByte(" ");
      writeByte((pixel >> 8) & 255);
      write(" ");
      writeByte((pixel >> 16) & 255);
      p += 4;
    }
    print();
    print();
  }
  print("# This is a PPM file, redirect stdout to view.");
}

var ffi = {
  print: print,
  puts: puts,
  sqrtF32: sqrtF32,
  flipBuffer: flipBuffer
};

m = WASM.instantiateModule(readbuffer(arguments[0]), ffi);
mem8 = new Uint8Array(m.memory);
mem32 = new Uint32Array(m.memory);
m.main();
