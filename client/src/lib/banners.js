// Banner helpers shared by the public site and the admin dashboard.
//
// The site supports multiple banners (site.banners). For backward
// compatibility, if no banners array exists yet we fall back to the old
// single site.hero object.

export function getBanners(site) {
  if (Array.isArray(site?.banners) && site.banners.length) return site.banners;
  if (site?.hero) return [{ id: 1, active: true, ...site.hero }];
  return [];
}

// The banner shown on the homepage: the one marked active, else the first.
export function getActiveBanner(site) {
  const banners = getBanners(site);
  if (!banners.length) return site?.hero || null;
  return banners.find((b) => b.active) || banners[0];
}

// Banners to show in the homepage slider: those marked visible
// (active !== false). Falls back to the first banner so the hero is
// never empty.
export function getVisibleBanners(site) {
  const banners = getBanners(site);
  const visible = banners.filter((b) => b.active !== false);
  if (visible.length) return visible;
  return banners.slice(0, 1);
}
