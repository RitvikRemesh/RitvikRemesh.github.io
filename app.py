from datetime import datetime
from pathlib import Path

from flask import Flask, render_template, send_from_directory


ROOT = Path(__file__).resolve().parent
app = Flask(
    __name__,
    static_folder=str(ROOT / "static"),
    static_url_path="/static",
    template_folder=str(ROOT / "templates"),
)


@app.get("/favicon.png")
def favicon():
    return send_from_directory(ROOT, "favicon.png")


@app.get("/assets/<path:filename>")
def portfolio_assets(filename):
    return send_from_directory(ROOT / "assets" / "assets", filename)


@app.get("/")
def home():
    return render_template("index.html", year=datetime.now().year)


if __name__ == "__main__":
    app.run()
