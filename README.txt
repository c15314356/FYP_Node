Final Year Project README - by Deividas Savickas C15314356
All files can be downloaded from the links below.
Crime Explorer is spilt into three parts:

https://github.com/c15314356/FYP_Nginx

https://github.com/c15314356/FYP_Node

https://github.com/c15314356/FYP_Python

FYP_Nginx: is all the website files these should be pasted into Nginx Server html folder or in a Linux enviroment /var/www/html
Once this is done that setup is complete.

Files that belong to me are:
-> css/style.css
-> js/main.js
-> js/crime_functions.js
-> index.html

FYP_Node: This requires a system to have Node.js installed, once installed past the main.js file into a folder and run the command
'npm install main.js' which will download all node modules and import all dependancies automatically. Once everything is downloaded to start the 
service run 'npm start' to begin server instance.

Files that belong to me are:
-> main.js

FYP_Python: This Folder contains multiple Folders with many different purposes, the larger take away they are used to generate, clean, optimise and import
data into a running MongoDB instance. NOTE when downloading the Python repository it contains the data folder which is 7-8GB in size, these
are the CSV files downloaded from data.uk.police API.

There is no point running the other Python scripts as they are used to generate the data that is downloaded already you can simple import using 
the scripts below.

All files within FYP_Python that are Python or JavaScript files belong to me.
In import into Mongo DB you will need to run:
-> RegionCreationFiles/import_region_polygons_using_geojson.py
-> CrimeImports/import_all_regions_final.py

All Files are explained within final Report.