# Ritvik Remesh Portfolio

This portfolio is served by Flask. The original Flutter web source was not present in the repository; the previous deployment contained only the compiled Flutter output. The site has been rebuilt as a Flask application using the existing profile and project images. The dependencies support Python 3.7 and newer.

## Run locally

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Open <http://127.0.0.1:5000>.

The contact form opens WhatsApp with the entered details; it does not store or send form data to this server.

## Deployment

Deploy this app to a Python-capable host using `app:app` as the WSGI entry point. GitHub Pages cannot run Flask applications.
