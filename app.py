from flask import Flask, flash, redirect, render_template, request, session, abort
import sentry_sdk

sentry_sdk.init("https://0457ea040434493aa1c8476837decf64@sentry.io/1444073")

app = Flask(__name__, static_url_path='')

@app.route('/static/<path:filename>') 
def send_file(filename): 
    return send_from_directory(app.upload_folder, filename)

@app.route("/")
def getMember():  
  return render_template('test.html')
 
if __name__ == "__main__":
  app.run()
  