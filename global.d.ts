import { string } from 'prop-types';

declare module "mktemp"

declare module "video-react"

interface IStatelessPage<P = {}> extends React.FunctionComponent<P> {
  getInitialProps?: (ctx: any) => any
}

interface IStatefulPage<P = {}> extends React.Component<P> {
  getInitialProps?: (ctx: any) => any
}

interface ICommonStyledProps {
  showLayout?: boolean
}

interface IGuideInfo {
  id: string
  videoUrl: string
  text: string
  thumbnailUrl: string
  filename: string
}

declare module 'react-markdown' {

  import {Component, ReactElement, ReactNode, ReactType} from 'react'

  declare class ReactMarkdown extends Component<ReactMarkdown.ReactMarkdownProps, {}> {}

  declare namespace ReactMarkdown {
    interface Point {
      readonly line: number
      readonly column: number
      readonly offset?: number
    }

    interface Position {
      readonly start: Point
      readonly end: Point
      readonly indent?: number[]
    }

    export type NodeType =
      | 'root'
      | 'text'
      | 'break'
      | 'paragraph'
      | 'emphasis'
      | 'strong'
      | 'thematicBreak'
      | 'blockquote'
      | 'delete'
      | 'link'
      | 'image'
      | 'linkReference'
      | 'imageReference'
      | 'table'
      | 'tableHead'
      | 'tableBody'
      | 'tableRow'
      | 'tableCell'
      | 'list'
      | 'listItem'
      | 'definition'
      | 'heading'
      | 'inlineCode'
      | 'code'
      | 'html'
      | 'virtualHtml'

    export type AlignType =
      | "left"
      | "right"
      | "center"
      | null

    export type ReferenceType =
      | "shortcut"
      | "collapsed"
      | "full"

    export type LinkTargetResolver = (uri: string, text: string, title?: string) => string

    export interface ReactMarkdownProps {
      readonly className?: string
      readonly source?: string
      readonly sourcePos?: boolean
      readonly includeNodeIndex?: boolean
      readonly rawSourcePos?: boolean
      readonly escapeHtml?: boolean
      readonly skipHtml?: boolean
      readonly allowNode?: (node: MarkdownAbstractSyntaxTree, index: number, parent: NodeType) => boolean
      readonly allowedTypes?: NodeType[]
      readonly disallowedTypes?: NodeType[]
      readonly linkTarget?: string | LinkTargetResolver
      readonly transformLinkUri?: (uri: string, children?: ReactNode, title?: string) => string
      readonly transformImageUri?: (uri: string, children?: ReactNode, title?: string, alt?: string) => string
      readonly unwrapDisallowed?: boolean
      readonly renderers?: Renderers
      readonly astPlugins?: MdastPlugin[]
      readonly plugins?: any[] | (() => void)
    }

    interface RenderProps extends ReactMarkdownProps {
      readonly definitions?: object
    }

    type Renderer<T> = (props: T) => ReactElement<T>
    interface Renderers {
      [key: string]: string | Renderer<any>
    }

    interface MarkdownAbstractSyntaxTree {
      align?: AlignType[]
      alt?: string | null
      checked?: boolean | null
      children?: MarkdownAbstractSyntaxTree[]
      data?: {[key: string]: any}
      index?: number
      depth?: number
      height?: number
      identifier?: string
      lang?: string | null
      loose?: boolean
      ordered?: boolean
      position?: Position
      referenceType?: ReferenceType
      start?: number | null
      title?: string | null
      type: string
      url?: string
      value?: string
      width?: number
    }

    type MdastPlugin = (node: MarkdownAbstractSyntaxTree, renderProps?: RenderProps) => MarkdownAbstractSyntaxTree

    export var types: NodeType[]
    export var renderers: Renderers
    export var uriTransformer: (uri: string) => string
  }

  export = ReactMarkdown
}
