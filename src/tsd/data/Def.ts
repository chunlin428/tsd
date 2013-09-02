///<reference path="../_ref.ts" />
///<reference path="DefVersion.ts" />

module tsd {

	var nameExp = /^(\w[\w_\.-]+?\w)\/(\w[\w_\.-]+?\w)\.d\.ts$/;

	/*
	 Def: single definition in repo (identified by its path)
	 */
	export class Def {

		// unique identifier: 'project/name' (should support 'project/name-v0.1.3-alpha')
		path:string;

		// split
		project:string;
		name:string;
		//used?
		semver:string;

		//the commit where we

		head:tsd.DefVersion;
		history:tsd.DefVersion[] = [];

		constructor(path:string) {
			xm.assertVar('path', path, 'string');
			this.path = path;
		}

		toString():string {
			return this.project + '/' + this.name + (this.semver ? '-v' + this.semver : '');
		}

		static isDefPath(path:string):bool {
			return nameExp.test(path);
		}

		static getPath(path:string):bool {
			return nameExp.test(path);
		}

		static getFrom(path:string):tsd.Def {

			var match = nameExp.exec(path);
			if (!match) {
				return null;
			}
			if (match.length < 1) {
				return null;
			}
			if (match[1].length < 1 || match[2].length < 1) {
				return null;
			}
			var file = new tsd.Def(path);
			file.project = match[1];
			file.name = match[2];
			//TODO support semver postfix 'project/name-v0.1.3-alpha'
			// path.semver = match[3];

			return file;
		}
	}
}