FROM python:3.7.4

# UTF-8 Support in the Shell
RUN printf 'export LC_ALL=C.UTF-8\nexport LANG=C.UTF-8\nexport LANGUAGE=C.UTF-8' >> /root/.bashrc

# jupyterlab
RUN pip install jupyterlab

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN jupyter labextension install @jupyter-widgets/jupyterlab-manager
RUN jupyter labextension install jupyter-matplotlib

WORKDIR /ai

# Install dependencies
COPY Requirements.txt /ai/

RUN pip install -r Requirements.txt

# Install ai
COPY . /ai/
RUN python3 setup.py develop

ENV PYTHONDONTWRITEBYTECODE=NO

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root", "--LabApp.token=''"]
