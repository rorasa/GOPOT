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

ENTRYPOINT [ "python", "gopot.py" ]