from flask import Flask, escape, request, abort, jsonify, render_template
import random
import os

app = Flask(__name__, static_folder="./build/static", template_folder="./build")

random.seed(75650)

SUPPORTED_COUNTRY_LIST = []

COMMODITY_LIST = [10110, 62095, 581920]

def getScore(country_code):
    if country_code in SUPPORTED_COUNTRY_LIST:
        # get internal score

        # get external score

        # get economy score
        
        # get strength score

        # get barrier score

        # compute total score
        pass
    else:
        commodity_scores = []
        for commodity_code in COMMODITY_LIST:
            internal_score = random.uniform(0,100)
            external_score = random.uniform(0,100)
            economy_score = random.uniform(0,100)
            strength_score = random.uniform(0,100)
            barrier_score = random.uniform(0,100)

            total_score = (0.2*internal_score)+(0.2*external_score)+(0.2*economy_score)+(0.2*strength_score)+(0.2*barrier_score)

            commodity_scores.append({
                "commodity_code": commodity_code,
                "score": total_score,
                "internal": internal_score,
                "external": external_score,
                "economy": economy_score,
                "strength": strength_score,
                "barrier": barrier_score
            })
        return {
            "country_code": country_code,
            "commodities": commodity_scores
        }

@app.route('/api/getCommodity')
def getCommodity():
    if request.method=="GET":
        country_code = request.args.get('country_code','US')
        scores = getScore(country_code)
        return jsonify(scores)
    else:
        abort(401)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host= '0.0.0.0')