import * as runtime from 'react/jsx-runtime';

type MDXComponents = Record<string, React.ComponentType<Record<string, unknown>>>;

type MDXModule = {
  default: React.ComponentType<{ components?: MDXComponents }>;
};

const useMDXComponent = (code: string): MDXModule['default'] => {
  const fn = new Function(code);
  return (fn({ ...runtime }) as MDXModule).default;
};

export function MDXContent({
  code,
  components,
}: {
  code: string;
  components?: MDXComponents;
}) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
