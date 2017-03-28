// Import React
import React from "react";

// MobX
import * as mobx from "mobx";
import * as mobxReact from "mobx-react";
import * as mobxUtils from "mobx-utils";
import DevTools from "mobx-devtools";
import PersonComponent from "./person";
import Form from "./form";

window.mobx = mobx;
window.mobxReact = mobxReact;
window.mobxUtils = mobxUtils;

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Text,
  ComponentPlayground
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  logo: require("../assets/logo.png"),
  flow: require("../assets/flow.png")
};

preloader(images);

class Demo extends React.Component {
  componentWillMount() {
    if (window.gustl === undefined) {
      class SimplePerson {
        constructor(firstName, lastName, address) {
          mobx.extendObservable(this, {
            firstName,
            lastName,
            address,
            name: mobx.computed(() => `${this.firstName} ${this.lastName}`),
            update: mobx.action(
              "update Simple Person",
              (firstName = this.firstName, lastName = this.lastName, address = this.address) => {
                this.firstName = firstName;
                this.lastName = lastName;
                this.address = address;
              }
            )
          });
        }
      }
      window.gustl = new SimplePerson("Sepp", "Gustl");
    }
  }
  render() {
    return (
      <div>
        <Form />
        <PersonComponent />
      </div>
    );
  }
}

class FromPromiseDemoComponent extends React.Component {
  constructor() {
    super();
    mobx.extendObservable(this, {
      generateDeferred() {
        this.deferred = mobxUtils.fromPromise(
          new Promise((done, reject) => {
            setTimeout(
              () => {
                if (Math.random() > 0.6) {
                  reject("connection problem");
                } else {
                  done("ok");
                }
                setTimeout(() => this.generateDeferred(), 2000);
              },
              5000
            );
          })
        );
      },
      deferred: null
    });
    this.generateDeferred();
  }
  render() {
    return this.deferred.case({
      pending: () => <div>loading...</div>,
      rejected: cause => <div>error {cause}</div>,
      fulfilled: ok => <div>DONE with {ok}</div>
    });
  }
}
const FromPromiseDemo = mobxReact.observer(FromPromiseDemoComponent);

const theme = createTheme(
  {
    primary: "#F6F4F4",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        theme={theme}
        transitionDuration={500}
      >

        <Slide transition={["zoom"]} notes="TODO">
          <Image src={images.logo} height="400px" />
          <Heading size={2}>MobX</Heading>
          <Heading size={4}>Simple, scalable state management</Heading>
        </Slide>

        <Slide transition={["slide"]} notes="TODO">

          <Heading size={2}>
            Core concepts
          </Heading>

          <List>
            <Appear><ListItem>Observable State</ListItem></Appear>
            <Appear><ListItem>Reactions</ListItem></Appear>
            <Appear>
              <ListItem>
                Computed Values
              </ListItem>
            </Appear>
          </List>

        </Slide>

        <Slide
          transition={["slide"]}
          maxWidth={window.innerWidth}
          bgDarken={0.75}
        >
          <Image src={images.flow} margin="0px auto 40px" />
        </Slide>

      <Slide transition={["slide"]} notes="TODO">
          <CodePane
            lang="javascript"
            source={require("raw-loader!./personModel.example")}
          />
        </Slide>

        <Slide transition={["slide"]} notes="TODO">

          <Heading size={2}>
            Principles
          </Heading>

          <List>
            <Appear>
              <ListItem>simple composable core concepts</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                keep state minimal - derive as much as possible
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                updates are applied
                <strong> automatically </strong>
                and
                <strong> atomically </strong>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                derivations are updated <strong> synchronously </strong>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                computed values are updated <strong> lazily </strong>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                computed values should be <strong> pure </strong>
              </ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide transition={["slide"]} notes="TODO">
          <Heading size={2} caps>
            React
          </Heading>
          <List>
            <Appear>
              <ListItem>MobX decides what needs to be rendered</ListItem>
            </Appear>
            <Appear>
              <ListItem>React simply renders</ListItem>
            </Appear>
            <Appear>
              <ListItem>Integration with HoC</ListItem>
            </Appear>
          </List>

          <Appear>
            <Text>
              <strong>ATTENTION: </strong>
              Do not over overemphasis. Local state is fine as long as it stays local
            </Text>
          </Appear>

        </Slide>

        <Slide transition={["slide"]} notes="TODO">
          <DevTools />
          <CodePane
            lang="javascript"
            source={require("raw-loader!./form.example")}
          />
          <Text />
          <CodePane
            lang="javascript"
            source={require("raw-loader!./person.example")}
          />
          <Text />
          <Demo />
        </Slide>

        <Slide transition={["slide"]} notes="TODO">
          <CodePane
            lang="javascript"
            source={require("raw-loader!./provider.example")}
          />
          <Text/>
          <CodePane
            lang="javascript"
            source={require("raw-loader!./providerDemo.example")}
          />
        </Slide>

        <Slide transition={["slide"]} notes="TODO">
          <List>
            <Heading size={2} caps>
              Pros
            </Heading>
            <Appear>
              <ListItem>It simply works</ListItem>
            </Appear>
            <Appear>
              <ListItem>fine grained control over updates/reactions</ListItem>
            </Appear>
            <Appear>
              <ListItem>Integration with HoC</ListItem>
            </Appear>
          </List>
          <List>
            <Heading size={2} caps>
              Cons
            </Heading>
            <Appear>
              <ListItem>Architecture</ListItem>
            </Appear>
            <Appear>
              <ListItem>Observable Wrapper Objects</ListItem>
            </Appear>
          </List>

        </Slide>

        <Slide transition={["slide"]} notes="TODO">
          <List>
            <Heading size={2} caps>
              Highlights
            </Heading>
            <Appear>
              <ListItem>
                <Link href="https://github.com/mobxjs/mobx-utils">
                  MobX Utils 💃
                </Link>
              </ListItem>
            </Appear>

            <Appear>
              <ListItem>
                <Link href="https://github.com/mobxjs/serializr">
                  Serializer {"\u{1F5DC}"}
                </Link>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                <Link href="https://github.com/mobxjs/mobx-state-tree">
                  MobX state tree 🚀
                </Link>
              </ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide transition={["slide"]} notes="TODO">
          <List>
            <CodePane
              lang="javascript"
              source={require("raw-loader!./fromPromise.example")}
            />
            <FromPromiseDemo />
          </List>
        </Slide>

        <Slide transition={["slide"]} notes="TODO">
          <List>
            <Heading size={2} caps>
              MobX State Tree
            </Heading>
            <Appear>
              <ListItem>
                state is a tree of models
              </ListItem>
            </Appear>

            <Appear>
              <ListItem>
                models are <strong>mutable</strong>, <strong>observable</strong> and <strong>rich</strong>
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                snapshots are <strong>immutable representation</strong> of the state of the model
              </ListItem>
            </Appear>
          </List>
        </Slide>


      </Deck>
    );
  }
}
