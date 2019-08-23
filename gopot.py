from flask import Flask, escape, request, abort, jsonify, render_template
import pandas as pd
import random
import os

app = Flask(__name__, static_folder="./build/static", template_folder="./build")

random.seed(75650)

SUPPORTED_COUNTRY_LIST = ['au', 'br', 'cn', 'de', 'in', 'id', 'mx', 'ph', 'sg', 'ae', 'us']

COMMODITY_LIST = [20622, 691390, 961519, 970190, 750522, 690911, 690510, 960840]

COMMODITY_NAME = ['Tire', 'Beans', 'Cauliflowers', 'Peas', 'Frozen vegetable mixtures', 'Leeks', 'Autoparts', 'Electronics parts']

#-----------------------------------------------------------------------------------------
internal_au = pd.read_csv('data/au_internal.csv')
internal_br = pd.read_csv('data/br_internal.csv')
internal_cn = pd.read_csv('data/cn_internal.csv')
internal_de = pd.read_csv('data/de_internal.csv')
internal_in = pd.read_csv('data/in_internal.csv')
internal_id = pd.read_csv('data/id_internal.csv')
internal_mx = pd.read_csv('data/mx_internal.csv')
internal_ph = pd.read_csv('data/ph_internal.csv')
internal_sg = pd.read_csv('data/sg_internal.csv')
internal_ae = pd.read_csv('data/ae_internal.csv')
internal_us = pd.read_csv('data/us_internal.csv')

external_us = pd.read_csv('data/external_score.csv')

strength = pd.read_csv('data/thailand_strength.csv')

economy = pd.read_csv("data/country_eco_score_4_pton.csv")





def getInternalScore(country_code, comm_code):
    if country_code=="au":
        internal = internal_au
    elif country_code=="br":
        internal = internal_br
    elif country_code=="cn":
        internal = internal_cn
    elif country_code=="de":
        internal = internal_de
    elif country_code=="in":
        internal = internal_in
    elif country_code=="id":
        internal = internal_id
    elif country_code=="mx":
        internal = internal_mx
    elif country_code=="ph":
        internal = internal_ph
    elif country_code=="sg":
        internal = internal_sg
    elif country_code=="ae":
        internal = internal_ae
    elif country_code=="us":
        internal = internal_us
    else:
        print("Country not found; sending random")
        return random.uniform(0,100)

    try:
        score = internal[internal.comm_code==comm_code].score.values[0]
    except:
        score = 0

    return score

def getStrengthScore(comm_code):
    try:
        score = strength[strength.comm_code==comm_code].score.values[0]
    except:
        score = 0
    
    
    return score

def getEconomicScore(country_code):
    try:
        score = economy[economy['Country Code']==country_code].avg_score.values[0]
    except:
        score = 0
    
    return score


def getScore(country_code):
    print(country_code)
    if country_code.lower() in SUPPORTED_COUNTRY_LIST:
        commodity_scores = []
        idx = 0
        for commodity_code in COMMODITY_LIST:
            # get internal score
            internal_score = getInternalScore(country_code.lower(), commodity_code)
            if not internal_score:
                internal_score = 0

            # get external score
            external_score = random.uniform(0,100)

            # get economy score
            econ_score = getEconomicScore(country_code.upper())
            if not econ_score:
                econ_score = 0
        
            # get strength score
            str_score = int(getStrengthScore(commodity_code))
            if not str_score:
                str_score = 0

            # get barrier score
            barrier_score = random.uniform(0,100)

            # compute total score
            total_score = (0.2*internal_score)+(0.2*external_score)+(0.2*econ_score)+(0.2*str_score)+(0.2*barrier_score)

            print(internal_score)
            print(econ_score)
            print(str_score)

            commodity_scores.append({
                "commodity_code": commodity_code,
                "name": COMMODITY_NAME[idx],
                "score": total_score,
                "internal": internal_score,
                "external": external_score,
                "economy": econ_score,
                "strength": str_score,
                "barrier": barrier_score
            })

            idx+=1
    
        return {
            "country_code": country_code,
            "commodities": commodity_scores
        }
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