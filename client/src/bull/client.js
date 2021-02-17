
// Store for all of the jobs in progress
let jobs = {};

// Kick off a new job by POST-ing to the server
async function addJob() {
  let res = await fetch('bull/job/', {method: 'POST'});
  let job = await res.json();
  jobs[job.id] = {id: job.id, state: "queued"};
  render();
}

// Fetch updates for each job
async function updateJobs() {
  for (let id of Object.keys(jobs)) {
    let res = await fetch(`bull/job/${id}`);
    let result = await res.json();
    if (!!jobs[id]) {
      jobs[id] = result;
    }
    render();
  }
}

// Delete all stored jobs
function clear() {
  jobs = {};
  render();
}

// Update the UI
function render() {
  let s = "";
  for (let id of Object.keys(jobs)) {
    s += renderJob(jobs[id]);
  }

  //very inefficient.
  document.querySelector("#job-summary").innerHTML = s;
}

// Renders the HTML for each job object
function renderJob(job) {
  let progress = job.progress || 0;
  let color = "bg-light-purple";

  return document.querySelector('#job-template')
    .innerHTML
    .replace('{{id}}', job.id)
    .replace('{{state}}', job.state)
    .replace('{{color}}', color)
    .replace('{{progress}}', progress);
}

// Attach click handlers and kick off background processes
window.onload = function() {
  document.querySelector("#add-job").addEventListener("click", addJob);
  document.querySelector("#clear").addEventListener("click", clear);

  setInterval(updateJobs, 200);
};
