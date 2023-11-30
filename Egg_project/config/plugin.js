"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: "egg-cors",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  validate: {
    enable: true,
    package: "egg-validate",
  },
};
