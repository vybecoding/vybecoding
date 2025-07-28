# How to Build and Use Claude Code Sub-Agents

This guide provides a concise overview of how to effectively create, use, and manage Claude Code sub-agents.

## 1. Core Concepts: The Information Flow

Understanding the flow of information is critical. Sub-agents do **not** interact directly with you. The process is:

1.  **You** prompt the **Primary Agent** (the main Claude Code agent).
2.  The **Primary Agent** interprets your request and prompts the appropriate **Sub-Agent**.
3.  The **Sub-Agent** executes its task and reports its results back to the **Primary Agent**.
4.  The **Primary Agent** formats the final response and presents it to **you**.

![Sub-Agent Flow](https://i.imgur.com/your-diagram-image.png)

---

## 2. The Two Biggest Mistakes to Avoid

1.  **Writing a User Prompt:** The prompt you write for a sub-agent is its **system prompt**, not a user prompt. It defines the agent's core purpose, personality, and high-level instructions.
2.  **Forgetting the Audience:** A sub-agent's response is for the **primary agent**, not for you. You must explicitly instruct your sub-agent on how to format its report so the primary agent can communicate the results effectively.

---

## 3. How to Create a Sub-Agent

Sub-agents are defined in markdown files within the `/agents` directory.

### Sub-Agent File Structure

```markdown
name: unique-agent-id
description: A rich description telling the primary agent WHEN and HOW to use this sub-agent.
tools: [tool_one, tool_two]
color: yellow
---
### Purpose
This is the **system prompt**. Define what this agent does.

### Report
Instruct the sub-agent on how to report back to the primary agent. Be explicit.
Example: "Claude, respond to the user with this message: [message]"
```

### Key Fields:

*   **`name`**: A unique identifier for your agent.
*   **`description`**: **This is the most important field.** The primary agent uses this to decide which sub-agent to call. Be descriptive and include trigger phrases.
    *   **Good Example:** "When the user asks for a summary with audio, or uses the phrase 'TTS summary', use this agent. You should prompt this agent by describing exactly what you want it to communicate."
*   **`tools`**: A list of specific tools the sub-agent is allowed to use. This creates a secure sandbox.
*   **`prompt`**: The markdown content below the `---` is the agent's **system prompt**.

---

## 4. Best Practices

*   **Be Specific in Descriptions:** Use keywords and phrases in the `description` to guide the primary agent.
    *   Example: `If the user says "Hi Claude" or "Hello CC", use this agent.`
*   **Guide the Primary Agent:** Use the `description` to tell the primary agent *how* to prompt your sub-agent.
    *   Example: `When you prompt this agent, describe exactly what you want them to communicate to the user.`
*   **Isolate Context:** Remind the primary agent in the `description` that the sub-agent has no prior context.
    *   Example: `Remember, this agent has no context of any previous conversations between you and the user.`
*   **Use "Important" Keyword:** To increase prompt adherence, use Anthropic's information-dense keyword: `important:`.
    *   Example: `important: You must only use the 'text-to-speech' and 'play-audio' tools.`

---

## 5. Chaining Sub-Agents for Workflows

You can create powerful, multi-step workflows by chaining sub-agents. Use a custom command (e.g., in a `/prompts` file) to define a sequence of tasks.

**Example `prompts/prime_tts.md`:**

```markdown
name: prime-tts
prompt: |
  When you finish priming the codebase, run the 'tts-summary-agent' and let the user know you're ready to build.
```

This allows you to execute a complex series of agentic tasks with a single command.

---

## 6. Pros and Cons

### Benefits:
*   **Context Preservation:** Each sub-agent has its own isolated context, preventing pollution of the main conversation.
*   **Specialized Expertise:** Create highly focused agents that do one thing well.
*   **Reusability:** Build a library of agents for common tasks within your repository.
*   **Flexible Permissions:** Lock down agents to a specific, safe set of tools.

### Issues & Drawbacks:
*   **No Context History:** Because contexts are isolated, you must explicitly pass all necessary information to the sub-agent in the prompt.
*   **Hard to Debug:** The internal workflow, prompts, and tool parameters for sub-agents are not directly visible, making debugging difficult.
*   **Decision Overload:** As you add more agents, the primary agent might get confused about which one to call. Clear descriptions are key to mitigating this.
*   **Dependency Coupling:** In complex chains, agents can become dependent on the specific output format of other agents, making the system brittle.
