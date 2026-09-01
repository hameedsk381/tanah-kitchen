# Read-only seed data for MongoDB initialization and CMS reset.

Seed files in this directory take priority over `src/data/` at runtime.
They are never modified by the server — MongoDB is the canonical store.

To customize production seeds, copy `menu.json` and `gallery.json` here before deploy.
