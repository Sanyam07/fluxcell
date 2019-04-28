FROM pytorch/pytorch

# UTF-8 Support in the Shell
RUN printf 'export LC_ALL=C.UTF-8\nexport LANG=C.UTF-8\nexport LANGUAGE=C.UTF-8' >> /root/.bashrc

# Install dependencies
COPY requirements.txt /ai/

WORKDIR /ai
RUN pip install -r requirements.txt

# Install fluxbot
COPY . /ai/
RUN python3 setup.py develop

ENTRYPOINT ["tail", "-f", "/dev/null"]
