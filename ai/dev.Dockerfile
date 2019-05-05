FROM pytorch/pytorch

# UTF-8 Support in the Shell
RUN printf 'export LC_ALL=C.UTF-8\nexport LANG=C.UTF-8\nexport LANGUAGE=C.UTF-8' >> /root/.bashrc

WORKDIR /ai

# Install dependencies
COPY requirements.txt /ai/
RUN pip install -r requirements.txt

# Install fluxbot
COPY . /ai/
RUN python3 setup.py develop

ENV PYTHONDONTWRITEBYTECODE=NO

ENTRYPOINT ["tail", "-f", "/dev/null"]
