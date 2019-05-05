FROM pytorch/pytorch

# Install dependencies
COPY requirements.txt /bot/

WORKDIR /bot
RUN pip install -r requirements.txt

# Install bot
COPY . /bot/
RUN python3 setup.py install

# Run bot
ENTRYPOINT [ "python3", "-m", "run.py" ]
