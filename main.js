"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("submit");
  const form1 = document.getElementById("form-timer");
  const timerh1 = document.getElementById("timer");
  const daysleft = document.getElementById("days-left");
  let intervalId; // Store the interval ID

  form1.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  if (!localStorage.getItem("date")) {
    if (localStorage.getItem("message")) {
      timerh1.innerText = localStorage.getItem("message");
      timerh1.style.backgroundColor = "rgb(0 0 0 / 50%)";

    }
  } else {
    timerFunction(localStorage.getItem("date"));
  }

  btn.addEventListener("click", () => {
    localStorage.clear();
    const getdate = document.getElementById("datetime").value;
    if (!getdate.includes("T")) {
      // If no time is specified, set the time to "00:00"
      getdate += "T00:00";
    }
    localStorage.setItem("date", getdate);
    timerFunction(localStorage.getItem("date"));
  });

  // As seconds are in ms
  const second = 1000,
    minutes = 60 * second,
    hour = 60 * minutes,
    day = 24 * hour;

  function timerFunction(getdate) {
    // Clear any previously running intervals
    clearInterval(intervalId);

    const dateEnter = document.getElementById("dateEntered")
    dateEnter.innerText="Date: "+getdate
    dateEnter.style.backgroundColor="black"
    

    // we need to calculate distance time like from rn to the set date and time
    intervalId = setInterval(() => {
      const timer = new Date(getdate).getTime();
      const today = new Date().getTime();
      const difference = timer - today;

      if (difference <= 0) {
        // The timer has reached or passed the target time
        localStorage.clear();
        let deadline = "Deadline Expired! Create a New One.";
        localStorage.setItem("message", deadline);
        if(localStorage.getItem("message")){
          timerh1.innerText = deadline;
          timerh1.style.backgroundColor = "rgb(0 0 0 / 50%)";
        }
        
        clearInterval(intervalId); // Clear the interval
      } else {
        const days = Math.floor(difference / day);
        const hourlydiff = hourdifference(difference);
        const minutesdiff = minutesdifference(difference);
        const secondsdiff = secondsdifference(difference);

        function hourdifference(difference) {
          const gethours = Math.floor(difference / hour);
          return gethours < 10 ? `0${gethours}` : gethours;
        }

        function minutesdifference(difference) {
          const getmin = Math.floor((difference % hour) / minutes);
          return getmin < 10 ? `0${getmin}` : getmin;
        }

        function secondsdifference(difference) {
          const getsec = Math.floor((difference % minutes) / second);
          return getsec < 10 ? `0${getsec}` : getsec;
        }

        timerh1.innerText =
        hourlydiff + "hr : " + minutesdiff + "m : " + secondsdiff + "s";
        timerh1.style.backgroundColor = "rgb(0 0 0 / 50%)";
        daysleft.innerHTML = days + " day left!";
      }
    }, 1000);
  }
});
