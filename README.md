<div align='center'>
  <img src='documentation/images/project_title.PNG'>
</div>

[![Netlify
Status](https://api.netlify.com/api/v1/badges/d5b83dca-ee5c-4ac5-8f47-09964abdc0a7/deploy-status)](https://app.netlify.com/sites/my-stacks/deploys)

A to-do list with a built in pomodoro timer to help you
complete your tasks

## Getting Started

A live build of the app can be accessed
[here](https://my-stacks.netlify.app/)

### What is it?

A to-do list helps you keep track of your tasks and routines.
The pomodoro technique helps you stick to those tasks.

Put them together and you get My Stacks.

### Creating a stack

A stack is a collection of related tasks.
You can create a stack for "Workouts", a stack for
"Studying", or a stack for your "Daily" routine.

<div align='center'>
  <img src='documentation/images/sidebar.PNG'>
</div>

Create a new stack down at the bottom of the sidebar.  

<div align='center'>
  <img src='documentation/images/add_stack.PNG'>
</div>

Name the stack and give it a color.

<div align='center'>
  <img src='documentation/images/name_stack_choose_color.PNG'>
</div>

### Creating a task

Once you've created a stack, you can start filling it with
tasks. Most to-do tasks are created with an implied
completion criteria of something being "finished". Taking
out the trash would be finished when the trash can is
emptied. Vacuuming your room would be finished when the
floor has been vacuumed. However, the types of tasks that
best fit the pomodoro technique aren't those that require
something to be "finished," but rather those that should be
worked on for some duration of time. Study for two hours,
paint for one hour, practice guitar for 30 minutes, etc.

<div align='center'>
  <img src='documentation/images/readme_trash_example.png'>
</div>

As part of the pomodoro technique, you'll break down a task
into multiple intervals, each 25 minutes in length with a 5
minute break for example. You can customize the duration and
break for each task.

<div align='center'>
  <img src='documentation/images/edit_block_item.PNG'>
</div>

You can also set the number of working intervals for a 
task by hovering over it with your mouse and clicking 
how many you want this task to have. A single dot 
represents one working interval.

<div align='center'>
  <img src='documentation/images/numbursts.PNG'>
</div>

### Playing a stack

Once you've got a stack of tasks, it's time to conquer them
one by one. Press 'Start session' to begin.

<div align='center'>
  <img src='documentation/images/start_session.PNG'>
</div>

Once the current work interval is over, you'll get a break
before the next interval starts.

<div align='center'>
  <img src='documentation/images/break_period.PNG'>
</div>

Once you've completed all intervals of a task, you'll get a
longer break: the grace period. If you've completed whatever
you hoped to finish in time you've blocked out for the task,
tap the checkmark to 'finish' this task. It'll delete it
from the stack once you end your session. Otherwise you can
hit the 'X' mark to return to this task in another session.

<div align='center'>
  <img src='documentation/images/grace_period.PNG'>
</div>

If you would rather treat all tasks in a stack as part of a
routine, so that the tasks aren't deleted when they're
completed, you can turn the stack into a 'Routine' via this
button.

<div align='center'>
  <img src='documentation/images/routine.PNG'>
</div>

## Built With

* [React](https://reactjs.org/) - The
  web framework used
* [Firebase Firestore + Authentication](https://firebase.google.com/) - Dependency Management
* [Express via Firebase Cloud
  Functions](https://firebase.google.com/docs/functions/)

The back-end Express API can be found
[here](https://github.com/XianhaiC/my-stacks-functions)

## Authors

* **Julian Alberto**
* **Xianhai Cao**

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details
