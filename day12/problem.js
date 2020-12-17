fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  console.log(part1(inputData.trim().split("\n")));
  console.log(part2(inputData.trim().split("\n")));
});

const degToRad = (deg) => (deg * Math.PI) / 180;

function part1(input) {
  function getUpdatedPose(pose, { action, value }) {
    switch (action) {
      case "N":
        return { ...pose, y: pose.y + value };
      case "S":
        return { ...pose, y: pose.y - value };
      case "E":
        return { ...pose, x: pose.x + value };
      case "W":
        return { ...pose, x: pose.x - value };
      case "L":
        return { ...pose, theta: pose.theta + value };
      case "R":
        return { ...pose, theta: pose.theta - value };
      case "F":
        return {
          ...pose,
          x: pose.x + value * Math.cos(degToRad(pose.theta)),
          y: pose.y + value * Math.sin(degToRad(pose.theta)),
        };
      default:
        return { ...pose };
    }
  }

  const commands = input.map(($) => ({
    action: $[0],
    value: parseInt($.substring(1)),
  }));
  let pose = { x: 0, y: 0, theta: 0 };

  for (const command of commands) {
    pose = getUpdatedPose(pose, command);
  }

  return Math.floor(Math.abs(pose.x) + Math.abs(pose.y));
}

function part2(input) {
  function getUpdatedShipPose(shipPose, waypoint, { action, value }) {
    switch (action) {
      case "F":
        return {
          ...shipPose,
          x: shipPose.x + waypoint.x * value,
          y: shipPose.y + waypoint.y * value,
        };
      default:
        return { ...shipPose };
    }
  }

  function getUpdatedWaypoint(waypoint, { action, value }) {
    switch (action) {
      case "N":
        return { ...waypoint, y: waypoint.y + value };
      case "S":
        return { ...waypoint, y: waypoint.y - value };
      case "E":
        return { ...waypoint, x: waypoint.x + value };
      case "W":
        return { ...waypoint, x: waypoint.x - value };

      // https://en.wikipedia.org/wiki/Rotation_matrix
      case "L":
        return {
          ...waypoint,
          x:
            waypoint.x * Math.cos(degToRad(value)) -
            waypoint.y * Math.sin(degToRad(value)),
          y:
            waypoint.x * Math.sin(degToRad(value)) +
            waypoint.y * Math.cos(degToRad(value)),
        };
      case "R":
        return {
          ...waypoint,
          x:
            waypoint.x * Math.cos(degToRad(value)) +
            waypoint.y * Math.sin(degToRad(value)),
          y:
            -waypoint.x * Math.sin(degToRad(value)) +
            waypoint.y * Math.cos(degToRad(value)),
        };

      default:
        return { ...waypoint };
    }
  }

  const commands = input.map(($) => ({
    action: $[0],
    value: parseInt($.substring(1)),
  }));

  let shipPose = { x: 0, y: 0 };
  let waypoint = { x: 10, y: 1 };

  for (const command of commands) {
    waypoint = getUpdatedWaypoint(waypoint, command);
    shipPose = getUpdatedShipPose(shipPose, waypoint, command);
  }

  return Math.floor(Math.abs(shipPose.x) + Math.abs(shipPose.y));
}
