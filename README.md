# Mudmap

This project is a visual map viewer for Tintin++ formatted map files.

## Goals
- Be able to display Tintin++ map files
    - Be able to show the environment in a visually stimulating way
- Be event driven when players move or the map gets updated

# Developing

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Accessing remote map file for development

Sometimes, it's useful want to test on a machine (or VM), but use your production
Tintin++ map file that's hosted on another environment.  SSHFS can be useful for this.

I do:

```
$ sudo apt-get install sshfs
$ sudo mkdir /mnt/node02
$ sudo sshfs -o allow_other,default_permissions scott@node02.home.scottyob.com: /mnt/node02
$ sudo chmod 0755 /mnt/node02
$ sudo ln -s /mnt/node02/map.map /map
```

