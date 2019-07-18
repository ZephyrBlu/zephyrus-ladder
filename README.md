## zephyrus-ladder

A React app for visualizing ladder data from StarCraft II.

## Functionality

The app uses conditional rendering to display the different types of information
as tabs and uses the Recharts library to render the charts.

Users can select different races and leagues to view information about using the controls with each graph.

## To Do

- Refactor code from a single monolithic file to multiple, smaller component files

- Aggregate JSON data in a single file to reduce the number of resource requests

- Refactor XHR's for resources to work asynchronously to improve load time and time to first meaningful/contentful paint

- Alter UI in Off-Race tab to convey meaning more effectively
