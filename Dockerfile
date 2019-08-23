FROM alpine:3.10

WORKDIR /var/www

RUN echo "**** install Python ****" && \
    apk add --no-cache python3 && \
    if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi

RUN echo "**** install pip ****" && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip

RUN echo "**** Install Flask ****" && \
    pip3 install --no-cache Flask

COPY gopot.py /var/www/gopot.py
COPY build /var/www/build

COPY data/au_internal.csv /var/www/data/au_internal.csv
COPY data/br_internal.csv /var/www/data/br_internal.csv
internal_cn = pd.read_csv('data/cn_internal.csv')
internal_de = pd.read_csv('data/de_internal.csv')
internal_in = pd.read_csv('data/in_internal.csv')
internal_id = pd.read_csv('data/id_internal.csv')
internal_mx = pd.read_csv('data/mx_internal.csv')
internal_ph = pd.read_csv('data/ph_internal.csv')
internal_sg = pd.read_csv('data/sg_internal.csv')
internal_ae = pd.read_csv('data/ae_internal.csv')
internal_us = pd.read_csv('data/us_internal.csv')

strength = pd.read_csv('data/thailand_strength.csv')

economy = pd.read_csv("data/country_eco_score_4_pton.csv")

ENTRYPOINT [ "python", "gopot.py" ]