FROM pytorch/pytorch

WORKDIR /bot

# Install dependencies
COPY requirements.txt /bot/
RUN pip install -r requirements.txt

# Install bot
COPY . /bot/
RUN python3 setup.py develop

ENV PYTHONDONTWRITEBYTECODE=NO

# Run bot
ENTRYPOINT [ "python3", "-m", "run.py" ] 
