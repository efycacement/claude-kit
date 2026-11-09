# claude-kit

My public skills and mods for [Claude Code](https://claude.com/claude-code), in one place. Every item is a standalone plugin under `plugins/`: install only what you need.

| Plugin | Type | What it does |
| --- | --- | --- |
| [savvy-flow](plugins/savvy-flow) | skill + agents | `/savvy-flow <task>`: the session model plans, delegates to tiered worker subagents and reviews their work. |
| [savvy-progress](plugins/savvy-progress) | mod | A progress bar above the prompt and a live agents panel. Made for savvy-flow, shows any subagents. |

savvy-flow and savvy-progress work on their own and light up together: with both installed, the flow drives the bar and workers report their progress to the panel.

### The Agency

The `agency-*` plugins package [The Agency](https://github.com/msitarzewski/agency-agents) (MIT), a roster of specialist subagent personas, one plugin per division. It is the same roster the Agency Agents desktop app (`brew install --cask msitarzewski/agency-agents/agency-agents`) installs, usable here through the plugin system and in cloud sessions, where that macOS app cannot run.

Every installed agent adds its description to each session's context, so install the divisions you use rather than all of them. Each plugin's README lists its agents.

<!-- agency:start -->
| Plugin | Division | Agents |
| --- | --- | --- |
| [agency-academic](plugins/agency-academic) | Academic | 6 |
| [agency-design](plugins/agency-design) | Design | 10 |
| [agency-engineering](plugins/agency-engineering) | Engineering | 66 |
| [agency-finance](plugins/agency-finance) | Finance | 5 |
| [agency-game-development](plugins/agency-game-development) | Game Development | 21 |
| [agency-gis](plugins/agency-gis) | GIS | 13 |
| [agency-healthcare](plugins/agency-healthcare) | Healthcare | 3 |
| [agency-marketing](plugins/agency-marketing) | Marketing | 37 |
| [agency-paid-media](plugins/agency-paid-media) | Paid Media | 7 |
| [agency-product](plugins/agency-product) | Product | 6 |
| [agency-project-management](plugins/agency-project-management) | Project Management | 7 |
| [agency-research](plugins/agency-research) | Research | 1 |
| [agency-sales](plugins/agency-sales) | Sales | 9 |
| [agency-security](plugins/agency-security) | Security | 12 |
| [agency-spatial-computing](plugins/agency-spatial-computing) | Spatial Computing | 6 |
| [agency-specialized](plugins/agency-specialized) | Specialized | 59 |
| [agency-support](plugins/agency-support) | Support | 6 |
| [agency-testing](plugins/agency-testing) | Testing | 9 |
<!-- agency:end -->

These plugins live in this fork, so add it as the marketplace:

```
/plugin marketplace add efycacement/claude-kit
/plugin install agency-marketing@claude-kit
/plugin install agency-paid-media@claude-kit
```

`python3 scripts/sync_agency_agents.py` pulls the latest upstream agents and regenerates the plugins, their marketplace entries and the table above.

## Install

### From the marketplace

In Claude Code:

```
/plugin marketplace add johnnyvizz/claude-kit
/plugin install savvy-flow@claude-kit
/plugin install savvy-progress@claude-kit
```

Restart the session afterwards. Plugin skills and agents are namespaced: the skill is `/savvy-flow:savvy-flow`, the agents `savvy-flow:savvy-careful` and so on.

### By hand

```bash
git clone https://github.com/johnnyvizz/claude-kit.git ~/claude-kit
```

**A skill** (no plugin system involved, names stay short: `/savvy-flow`, `savvy-careful`): copy its folders into your Claude Code config.

```bash
cp -R ~/claude-kit/plugins/savvy-flow/skills/savvy-flow ~/.claude/skills/
```

```bash
cp ~/claude-kit/plugins/savvy-flow/agents/*.md ~/.claude/agents/
```

**A mod**: load the folder for one session,

```bash
claude --plugin-dir ~/claude-kit/plugins/savvy-progress
```

or for every session (including the desktop app) through `env` in `~/.claude/settings.json`. Several folders are separated with `:`; if the variable is already set, append to it rather than replacing it:

```json
{
  "env": {
    "CLAUDE_CODE_PLUGIN_DIRS": "~/claude-kit/plugins/savvy-progress"
  }
}
```

`git pull` in the clone updates a mod loaded this way; copied skills need copying again.

Mods are built on function hooks (`hooks/register.tsx`), an early-access Claude Code API: tested on Claude Code 2.1.286, and it may change between releases. If a mod installed from the marketplace does not show up, load it by hand as above.

## Layout

```
.claude-plugin/marketplace.json   the catalog `/plugin marketplace add` reads
plugins/<name>/
  .claude-plugin/plugin.json      manifest
  skills/<skill>/SKILL.md         a skill
  agents/*.md                     subagents it ships
  hooks/hooks.json                a mod: points at the hooks module
  hooks/register.tsx              a mod: the module itself
  types/index.d.ts                a mod: its $.state contract
scripts/sync_agency_agents.py     regenerates the agency-* plugins from upstream
```

Check a plugin before publishing: `claude plugin validate plugins/<name>`, and the catalog with `claude plugin validate .`.

## License

MIT
