import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:3001/rpc/graphql',
	documents: ['src/lib/**/*.graphql'],
	ignoreNoDocuments: true,
	generates: {
		'./src/lib/gql/': {
			preset: 'client',
			config: {
				useTypeImports: true
			}
		}
	}
};
export default config;
