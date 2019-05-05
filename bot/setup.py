from setuptools import setup, find_packages

setup(
    name='bot',
    version='0.1.0',
    description='fluxcraft\'s native bot framework.',
    author='Matan Bendix Shenhav',
    author_email='matan@fluxcraft.net',
    url='https://www.github.com/fluxcraft/fluxcell',
    packages=find_packages('src'),
    package_dir={'': 'src'}
)
