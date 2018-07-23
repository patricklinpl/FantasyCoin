# FantasyCoin
💰₿💰 - A Fantasy Sport like web application to compare cryptocurrency performance. Compete against others to reach the top of the leaderboard.

## Setup
    $ git clone https://github.com/sjason19/FantasyCoin.git
    $ cd ~/Github/FantasyCoin
    $ npm install
    $ npm start
 
## Notes on creating a new scraper and adding to DB
### Step 1 Create the Item
- In items.py you will want to create a new class item with your requested fields you wish to scrape
### Step 2 Create the spider
- Create the spider in mlb_scraper/spiders
### Step 3 Create the model
- In models.py you will want to make a function to create the table like so:
```
def create_table_name_table(engine):
    """"""
    DeclarativeBase.metadata.create_all(engine)
```
- Then you will want to create a new model that contains the same fields as your item that you previously created (Import any needed Data types before using) ie:
```
class ModelName(DeclarativeBase):
    """Sqlalchemy model name model"""
    __tablename__ = "table_name"
    
    primary_key_column = Column(Integer, primary_key=True)
    other_column = Column('atBats', Integer, nullable=True)
```
### Step 4 Configure the pipeline
- In pipelines.py under __init__(self) you will want to call the create table function you made
```
create_table_name(engine)
```
- In process_item(..) you will want to perform the insertion to the table by checking if the current item is the instance you want
```
        if isinstance(item, ItemNameItem):
            table = ModelName(**item)
```
- Finally, import the name of the Model, create table function, and Item at the top


## Troubleshooting
Getting errors related to node-gyp? ie:
```
node-pre-gyp ERR! Tried to download(404): https://fsevents-binaries.s3-us-west-2.amazonaws.com/v1.1.3/fse-v1.1.3-node-v64-darwin-x64.tar.gz 
node-pre-gyp ERR! Pre-built binaries not found for fsevents@1.1.3 and node@10.6.0 (node-v64 ABI, unknown) (falling back to source compile with node-gyp) 
node-pre-gyp ERR! Tried to download(undefined): https://fsevents-binaries.s3-us-west-2.amazonaws.com/v1.1.3/fse-v1.1.3-node-v64-darwin-x64.tar.gz 
node-pre-gyp ERR! Pre-built binaries not found for fsevents@1.1.3 and node@10.6.0 (node-v64 ABI, unknown) (falling back to source compile with node-gyp) 
```
Run the following command:
```
$ npm install -g node-gyp
```

If you're still having some issues, try using this version of node and npm:
```
$ node -v
v8.9.1
$ npm -v
5.6.0
```
run npm install after switching versions
