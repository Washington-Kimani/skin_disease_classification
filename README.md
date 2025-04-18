# Skin Disease Classification System</br>

The following are the instructions to run the project.</br>
## System requirements
1. Python. [download](https://www.python.org/ftp/python/3.13.3/Python-3.13.3.tar.xz)
2. NodeJS. [download](https://nodejs.org/en/download)

## Set up the API
1. Change directory to the backend directory
```bash
cd skin_disease_classification/backend
```
2. Create a virtual environment for the project.
```bash
python -m venv env
```
3. Activate the environment
```bash
source env/bin/activate
```
5. Install the requirements.
```bash
pip install -r requirements.txt
```
6. Run the app, preferably with debug mode on.
```bash
flask --app app run --debug
```

## Running the frontend
### After opening a different terminal instance

1. Switch to the frontend directory
```bash
cd skin_disease_classification/frontend
``` 
2. Install dependencies.
```bash
npm install
```
3. Run the react server
```bash
npm run dev
```