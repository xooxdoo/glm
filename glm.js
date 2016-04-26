(function (std) {
"use strict";

if (std.glm) return console.warn("GLM is already loaded");

let exports = global.glm = Object.create({});

const F32    = std.Float32Array;
const F64    = std.Float64Array;
const U8     = std.Uint8Array;
const U16    = std.Uint16Array;
const U32    = std.Uint32Array;
const I8     = std.Int8Array;
const I16    = std.Int16Array;
const I32    = std.Int32Array;

const random = std.Math.random;
const floor  = std.Math.floor;

const isNaN  = std.isNaN;
const degree = Math.PI / 180;

const conv   = exports.conv = (function () {

  let uint8  = new  U8(1);
  let uint16 = new U16(1);
  let uint32 = new U32(1);
  let int8   = new  I8(1);
  let int16  = new I16(1);
  let int32  = new I32(1);

  return {
  
    int8(n) {
        int8[0] = n;
        return int8[0];
    }
  
    uint8(n) {
        uint8[0] = n;
        return uint8[0];
    }
  
    int16(n) {
        int16[0] = n;
        return int16[0];
    }
  
    int32(n) {
        int32[0] = n;
        return int32[0];
    }
  
    uint32(n) {
        uint32[0] = n;
        return uint32[0];
    }
  
    float: std.Math.fround || (function () {
      let f32 = new F32(1);
      return function fround(n) {
        f32[0] = n;
        return f32[0];
      };
    })();

    double(n) {
      return +(n);
    }
  
  };

}());

exports.safe = function safe(n) {
  if(isNaN(n)) throw "Not a Number!";
  return n;
};

exports.toRadian = function(a){
  return a * degree;
};

exports.equals = function(a, b) {
	return Math.abs(a - b) <= exports.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}

exports.EPSILON = Number.EPSILON || 0.000001;

exports.Random = {
  int(size , offset = 0) {
    return conv.int16(this.double(size , offset));
  }
  int8(size , offset = 0) {
    return conv.int8(this.int(size , offset));
  }
  int32(size , offset = 0) {
    return conv.int32(this.double(size , offset));
  }
  uint8(size , offset = 0) {
    return conv.uint8(this.int(size , offset));
  }
  uint16(size , offset = 0) {
    return conv.uint16(this.int(size , offset));
  }
  uint32(size , offset = 0) {
    return conv.uint32(this.double(size , offset));
  }
  float(size , offset = 0) {
    return conv.float(this.double(size , offset));
  }
  double(size, offset = 0) {
    return random() * size + offset;
  }
};

exports.Random.int16 = exports.Random.int;

class vec2 {
  constructor(x, y) {
    let buffer = this.buffer = new F32(2);
    buffer[0] = x;
    buffer[1] = y;
  }
  
  plus(v) {
    return v && v.buffer ? this.plusV(v) : this.plusN(n);
  }
  
  plusV(n) {
    this.buffer[0] += v.buffer[0];
    this.buffer[1] += v.buffer[1];
  }
  
  plusN(n) {
    this.buffer[0] += n;
    this.buffer[1] += n;
  }
  
  static plus(left, right) {
    if (!left.buffer) return this.clone(right).plus(left);
    return this.clone(left).plus(right);
  }
  static create(x, y) {
    return new vec2(x, y);
  }
  static clone(v) {
    return this.fromBuffer(b);
  }
  static fromBuffer(b) {
    return new vec2(b[0], b[1]);
  }
}

std.vec2 = exports.vec2 = function vec2(x, y = x) {
  if (x && x.length) return vec2.fromBuffer(x);
  if (x && x.buffer) return vec2.clone(x);
  return new vec2(x, y);
};

exports.vec2.class = vec2;

})(this);
