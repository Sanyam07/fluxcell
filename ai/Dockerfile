FROM python:3.7.4

# UTF-8 Support in the Shell
RUN printf 'export LC_ALL=C.UTF-8\nexport LANG=C.UTF-8\nexport LANGUAGE=C.UTF-8' >> /root/.bashrc

WORKDIR /ai

# Install dependencies
COPY Requirements.txt /ai/

RUN pip install -r Requirements.txt

# Install ai
COPY . /ai/
RUN python3 setup.py install

ENTRYPOINT ["tail", "-f", "/dev/null"]
