import CollectionEditor from './CollectionEditor.jsx';
import { useDashboard } from './DashboardProvider.jsx';

// Booth locations live at the top level (content.locations).
export function BoothsEditor() {
  const { content, updateLocations } = useDashboard();
  return (
    <CollectionEditor
      title="Booth Locations"
      items={content.locations}
      onChange={updateLocations}
      schema={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'lat', label: 'Latitude', type: 'number' },
        { key: 'lng', label: 'Longitude', type: 'number' },
        { key: 'image', label: 'Image', type: 'image' }
      ]}
    />
  );
}

// The rest are nested under content.site.<key>.members / .posts.
function NestedCollection({ sectionKey, listKey, title, schema }) {
  const { content, updateSite } = useDashboard();
  const section = content.site[sectionKey] || {};
  const items = section[listKey] || [];
  return (
    <CollectionEditor
      title={title}
      items={items}
      schema={schema}
      onChange={(next) => updateSite(sectionKey, { ...section, [listKey]: next })}
    />
  );
}

export function VolunteersEditor() {
  return (
    <NestedCollection
      sectionKey="volunteers"
      listKey="members"
      title="Volunteers"
      schema={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'contribution', label: 'Contribution', type: 'textarea' },
        { key: 'image', label: 'Photo', type: 'image' }
      ]}
    />
  );
}

export function ActivistsEditor() {
  return (
    <NestedCollection
      sectionKey="activists"
      listKey="members"
      title="Activists"
      schema={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'bio', label: 'Bio', type: 'textarea' },
        { key: 'image', label: 'Photo', type: 'image' }
      ]}
    />
  );
}

export function TeamEditor() {
  return (
    <NestedCollection
      sectionKey="team"
      listKey="members"
      title="Team Members"
      schema={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'bio', label: 'Bio', type: 'textarea' },
        { key: 'image', label: 'Photo', type: 'image' }
      ]}
    />
  );
}

export function BlogEditor() {
  return (
    <NestedCollection
      sectionKey="blog"
      listKey="posts"
      title="Blog Posts"
      schema={[
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { key: 'author', label: 'Author', type: 'text' },
        { key: 'date', label: 'Date (YYYY-MM-DD)', type: 'text' },
        { key: 'readMins', label: 'Read time (mins)', type: 'number' },
        { key: 'image', label: 'Cover image', type: 'image' },
        { key: 'content', label: 'Body paragraphs', type: 'stringList' }
      ]}
    />
  );
}
