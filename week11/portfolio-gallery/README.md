# Portfolio Gallery

Week 11 homework for Web Programming (K0126_002): a small React app that
renders a portfolio as cards you can filter by technology.

```bash
npm install
npm start          # http://localhost:3000
```

## Components

| Component | Responsibility |
| --- | --- |
| `App` | Owns the selected filter in `useState` and derives the visible list. |
| `FilterBar` | Renders one button per technology; reports clicks to the parent. |
| `ProjectList` | Maps the visible projects to cards with a stable `key`. |
| `ProjectCard` | Renders one project from its props: title, description, tech, links. |

## Files

```
public/index.html
src/index.js
src/index.css
src/App.js
src/App.css
src/data/projects.js
src/components/FilterBar.js
src/components/ProjectList.js
src/components/ProjectCard.js
```

## Notes

- Props flow one way: only `App` holds state, and its children read the
  props they are given and call back through `onChange`.
- `key` comes from `project.id`, never from the array index, so filtering
  removes the right cards.
- Adding a project is one more object in `src/data/projects.js`.
