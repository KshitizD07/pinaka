import projectsData from '../../../data/projects.json';

/**
 * Returns all projects from the registry.
 * @returns {Array} All project entries
 */
export function getAllProjects() {
  return projectsData;
}

/**
 * Returns projects filtered by track.
 * @param {string} track - One of: flagship | research | incubating | community
 * @returns {Array}
 */
export function getProjectsByTrack(track) {
  return projectsData.filter((p) => p.track === track);
}

/**
 * Returns projects filtered by status.
 * @param {string} status - One of: concept | prototype | mvp | pilot | live | paused | archived
 * @returns {Array}
 */
export function getProjectsByStatus(status) {
  return projectsData.filter((p) => p.status === status);
}

/**
 * Returns featured projects: flagship track with active statuses (mvp, pilot, live).
 * @returns {Array}
 */
export function getFeaturedProjects() {
  const activeStatuses = ['mvp', 'pilot', 'live'];
  return projectsData.filter(
    (p) => p.track === 'flagship' && activeStatuses.includes(p.status)
  );
}
