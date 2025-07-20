interface Project {
  name: string
}

const _cache = {
  projects: new Map<string, Project[]>(),
}

const project = ref('')

function getProject(name: string): Project[] {
  return [
    {
      name,
    },
  ]
}

watch(project, () => {
  _cache.projects.clear()
})

function cached(key: keyof typeof _cache): (project: Project) => Project[] {
  return project => {
    const matched = _cache[key].get(project.name)
    if (matched) {
      return matched
    }
    const result = getProject(project.name)
    _cache[key].set(project.name, result)
    return result
  }
}

export const projects = cached('projects')

export const playloads = {}
