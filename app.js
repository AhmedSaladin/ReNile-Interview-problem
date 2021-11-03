// Sample input:
// person1 Appoiments [['9:00', '10:30'], ['12:00', '13:00'], [16:00', '18:00']]
// person1 Work hours ['9:00', '20:00']
// person2 Appoiments [['10:00', '11:30'], [‘12:30', '14:30'], ['14:30', '15:00'], [16:00', '17:00’]]
// person2 Work hours ['10:00', '18:30']
// meeting time 30min

// Sample output:
// [['11:30', '12:00'], [‘15:00', '16:00'], [18:00', '18:30']]

// 1- check end meeting time with start of next interval 11.30-12
// //
// 2- get all empty times in person 1 clender 10.30-12.00 -> 13.00:16.00-?18.00-20.00
//      -get all empty times in person 2 clender 11.30-12.30 -> 15.00:16.00-> 17.00-18.30
//     2.1- check if person1 rang fit with person 2 rang if true (output  date)else check next time.
//         [11.30-12.00],[15.00:16.00],[18.00-18.30]

let person1_appoiments = [
  ["9:00", "10:30"],
  ["12:00", "13:00"],
  ["16:00", "18:00"],
];
const person1_working_hours = ["9:00", "20:00"];

let person2_appoiments = [
  ["10:00", "11:30"],
  ["12:30", "14:30"],
  ["14:30", "15:00"],
  ["16:00", "17:00"],
];
const person2_working_hours = ["10:00", "18:30"];

const meeting_time = 30;

person1_appoiments = convertTime(person1_appoiments);
person2_appoiments = convertTime(person2_appoiments);

const avaliable_time_for_a = get_available_time(
  person1_appoiments,
  person1_working_hours
);
const avaliable_time_for_b = get_available_time(
  person2_appoiments,
  person2_working_hours
);

const avaliable_time_for_meeting = get_meeting_time(
  avaliable_time_for_a,
  avaliable_time_for_b,
  meeting_time
);
console.log(output_avaliable_time_for_meeting(avaliable_time_for_meeting));

// helper funcitons
function convertTime(arr) {
  return arr.map((e) => e.map(convert_time_to_decimal));
}

function convert_time_to_decimal(t) {
  const arr = t.split(":");
  const dec = parseInt((arr[1] / 6) * 10);
  return parseFloat(parseInt(arr[0]) + "." + (dec < 10 ? "0" : "") + dec);
}

function get_available_time(arr, limit) {
  let availableTime = [];
  let end = limit.map(convert_time_to_decimal);

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1][1] != arr[i][0])
      availableTime.push([arr[i - 1][1], arr[i][0]]);
  }
  if (arr[arr.length - 1][1] != end[1])
    availableTime.push([arr[arr.length - 1][1], end[1]]);
  return availableTime;
}

function get_meeting_time(a, b, meetingTime) {
  meetingTime = meetingTime / 60;
  let availableIntervals = [];

  for (let i = 0; i < a.length; i++) {
    if (a[i][0] < b[i][0] && b[i][0] + meetingTime <= a[i][1])
      availableIntervals.push([b[i][0], a[i][1]]);

    if (a[i][0] > b[i][0] && a[i][0] + meetingTime <= b[i][1])
      availableIntervals.push([a[i][0], b[i][1]]);
  }

  return availableIntervals;
}

function output_avaliable_time_for_meeting(arr) {
  return arr.map((e) => e.map(time_to_string));
}

function time_to_string(t) {
  let hour = parseInt(t);
  let minute = Math.ceil(((t % 1) * 60) / 1);
  hour >= 10 ? (hour = `${hour}`) : (hour = `0${hour}`);
  minute >= 10 ? (minute = `${minute}`) : (minute = `0${minute}`);
  return `${hour}:${minute}`;
}
